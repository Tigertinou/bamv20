import TrackPlayer, { RepeatMode } from 'react-native-track-player';

// @ts-expect-error – sure we can import this
// import playlistData from '../../assets/playlist.json';
// @ts-expect-error – sure we can import this
// import localTrack from 'https://stream.medianation.be/bamaac';
// @ts-expect-error – sure we can import this
// import localArtwork from 'https://media.businessam.be/TheMorningDrive-1672135064.jpg?auto_optimize=low&width=300&aspect_ratio=1:1';

export const QueueInitialTracksService = async () => {
  await TrackPlayer.add([
    {
      url: 'https://stream.medianation.be/bamaac',
      title: 'Pure (Demo)',
      artist: 'David Chavez',
      artwork: 'https://media.businessam.be/TheMorningDrive-1672135064.jpg?auto_optimize=low&width=300&aspect_ratio=1:1',
      duration: 28,
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};