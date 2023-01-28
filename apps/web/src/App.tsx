import { Suspense, useEffect, useState } from 'react';
import { RouterProvider, useRoutes } from 'react-router-dom';
import { Spinner } from 'ui';
import router from '@/utils/router';
const iceServers = [
	{
		urls: 'stun:192.168.1.104:9000?transport=udp',
	},
];
import Video from '@/components/Video';
function App() {
	const [localStream, setLocalStream] = useState<MediaStream>();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();

	useEffect(() => {
		const start = async () => {
			const localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			setLocalStream(localStream);
			const peer1 = new RTCPeerConnection({
				iceServers,
			});
			const peer2 = new RTCPeerConnection({ iceServers });
			peer1.addEventListener('icecandidate', async (e) => {
				console.log('peer2 icecandidate', e);
				await peer2.addIceCandidate(e.candidate!);
			});
			peer2.addEventListener('icecandidate', async (e) => {
				console.log('peer2 icecandidate', e);
				await peer1.addIceCandidate(e.candidate!);
			});
			peer1.addEventListener('iceconnectionstatechange', (e) => {
				console.log('peer1 iceconnectionstatechange', e);
			});
			peer2.addEventListener('iceconnectionstatechange', (e) => {
				console.log('peer2 iceconnectionstatechange', e);
			});
			peer2.addEventListener('track', (e) => {
				console.log('peer2 track', e);
				setRemoteStream(e.streams[0]);
			});
			localStream.getTracks().forEach((track) => peer1.addTrack(track, localStream));
			const offer = await peer1.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
			await peer1.setLocalDescription(offer);
			await peer2.setRemoteDescription(offer);
			const answer = await peer2.createAnswer();
			await peer2.setLocalDescription(answer);
			await peer1.setRemoteDescription(answer);
		};
		start();
	}, []);
	return (
		<>
			{localStream && <Video srcObject={localStream} />}
			{remoteStream && <Video srcObject={remoteStream} />}
		</>
		// <Suspense fallback={<Spinner />}>
		// 	<RouterProvider router={router} />
		// </Suspense>
	);
}

export default App;
