import socket from "@/utils/socket"
let baseURL = import.meta.env.VITE_BASE_API.replace('http', 'ws');

let localStream: MediaStream; // 本地流
let peerConnection: RTCPeerConnection; // 对等连接
let remotevideoDOM: HTMLMediaElement;

export const setRemoteVideoDOM = (_remotevideoDOM: HTMLMediaElement | undefined) => {
    remotevideoDOM = _remotevideoDOM!;
}

/**
 * websocket 连接 - 服务器
 * @param uid 用户ID
 */
export const connect = (uid: number) => {

    socket.connect(`${baseURL}/live/${uid}`);

    socket.onopen(() => {
        console.log('已连接服务器...');
    })

    socket.onmessage((e: MessageEvent) => {
        let SDP: any = JSON.parse(e.data);
        if (SDP.type === 'offer') {
            relayOffer(SDP);
        } else if (SDP.type === 'answer') {
            relayAnswer(SDP);
        } else if (SDP.type === 'candidate') {
            relayCandidate(SDP)
        }
    })
}

/**
 * 断开连接
 */
export const close = () => {
    socket.disconnect();
}

/**
 * 断开 peer
 */
export const stopPeerConnection = () => {
    peerConnection.close();
}

/**
 * 断开 视频流
 */
export const stopStream = () => {
    if (localStream) {
        localStream.getTracks().forEach((track) => {
            track.stop();
            track.clone();
            localStream.removeTrack(track);
        })
    }
}

export const replaceStream = (track: MediaStreamTrack) => {
    peerConnection.getSenders()[0].replaceTrack(track);
}

/**
 * 视频流播放到video标签中并播放
 * @param videoELement \<video\> - DOM元素
 * @param V `true` - 使用共享屏幕; `false` - 使用摄像头
 * @param mediaConfig 媒体设置
 * @default mediaConfig { video: true, audio: true }
 * @return 返回一个`Promise<MediaStream>`类型
 */
export const startVideo = (videoELement: HTMLMediaElement | undefined, V: boolean, mediaConfig: MediaStreamConstraints = { video: true, audio: true }) => {
    return new Promise<MediaStream>((resolve, reject) => {
        const C = (stream: MediaStream) => {
            localStream = stream;
            videoELement!.srcObject = stream;
            videoELement!.play();
            videoELement!.volume = 0;
            resolve(stream);
        }
        if (V) {
            window.navigator.mediaDevices.getDisplayMedia(mediaConfig).then((stream: MediaStream) => {
                C(stream);
            }).catch(error => {
                reject(new Error(`发生了一个错误: [错误代码：${error.code}]`))
            })
        } else {
            window.navigator.mediaDevices.getUserMedia(mediaConfig).then((stream: MediaStream) => {
                C(stream);
            }).catch(error => {
                console.log(error);
                reject(new Error(`发生了一个错误: [错误代码：${error.code}]`))
            })
        }

    });
}

/**
 * 发送Offer
 */
export const startRemote = () => {
    if (!localStream) {
        console.error('请先捕获本地视频数据');
        return;
    }
    peerConnection = newPeerConnection(); // 创建对等连接

    console.log('准备发送offer');
    peerConnection.createOffer().then((sessionDescription: RTCLocalSessionDescriptionInit) => { //创建offer并存到对等连接的本地描述
        peerConnection.setLocalDescription(sessionDescription);
        console.log('offer已存到对等连接的本地描述中，发送offer！');
        sendSDP(sessionDescription);
    }).catch((error) => {
        console.error('创建offer出现错误');
    })
}

/**
 * 接收offer
 */
const relayOffer = (sessionDescription: RTCSessionDescriptionInit) => {
    console.log('接收到offer');
    peerConnection = newPeerConnection(); // 重新创建对等连接
    peerConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription)); //将offer存到对等连接的远程描述
    console.log('offer已存到对等连接的远程描述中');
    sendAnswer();
}

/**
 * 发送answer
 */
const sendAnswer = () => {
    console.log('准备发送answer');
    peerConnection.createAnswer().then((sessionDescription: RTCLocalSessionDescriptionInit) => { //创建answer并存到对等连接的本地描述
        peerConnection.setLocalDescription(sessionDescription);
        console.log('answer已存到对等连接的本地描述中，发送answer！');
        sendSDP(sessionDescription);
    }).catch((error) => {
        console.error('创建answer出现错误');
    })
}

/**
 * 接收answer
 */
const relayAnswer = (sessionDescription: RTCSessionDescriptionInit) => {
    console.log('接收到answer');
    peerConnection.setRemoteDescription(sessionDescription); //将answer存到对等连接的远程描述
    console.log('answer已存到对等连接的远程描述中');
}

/**
 * 发送SDP
 */
const sendSDP = (SDP: RTCSessionDescriptionInit | RTCLocalSessionDescriptionInit) => {
    let SDPJSON = JSON.stringify(SDP);
    socket.send(SDPJSON)
}
/**
 * 发送ICE
 * @param candidate ICE
 */
const sendCandidate = (candidate: any) => {
    var text = JSON.stringify(candidate);
    socket.send(text) // socket发送
}

/**
 * 接收ICE
 * @param candidate ICE
 */
const relayCandidate = (e: RTCIceCandidate) => {
    let candidate = new RTCIceCandidate({
        sdpMLineIndex: e.sdpMLineIndex,
        sdpMid: e.sdpMid,
        candidate: e.candidate
    });
    console.log("接收到Candidate...")
    peerConnection!.addIceCandidate(candidate);
}

/**
 * 创建新的对等连接
 * @returns 返回新的RTCPeerConnection
 */
const newPeerConnection = (): RTCPeerConnection => {
    let peer = new RTCPeerConnection({ iceServers: [] });

    localStream.getTracks().forEach((track: MediaStreamTrack) => { // 添加流到对等连接
        peer.addTrack(track, localStream);
    })

    peer.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
        if (e.candidate) {
            sendCandidate({
                type: "candidate",
                sdpMLineIndex: e.candidate.sdpMLineIndex,
                sdpMid: e.candidate.sdpMid,
                candidate: e.candidate.candidate
            });
        }

    }

    peer.ontrack = (e: RTCTrackEvent) => {
        remotevideoDOM.srcObject = e.streams[0]
    }
    return peer;
}