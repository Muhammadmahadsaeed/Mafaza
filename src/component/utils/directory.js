import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

const dirHomePictures = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/Mafaza`,
  android: `${RNFS.PicturesDirectoryPath}/Mafaza`,
});

// export const dirPicutures = `${dirHomePictures}/Images`;

function getAudioFolderPath() {
  return new Promise((resolve, reject) => {
    //make audio folder in app folder
    const AppFolder = 'Mafaza';
    const AudioDirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder + '/audio';
    //create path 
    const dirHomeAudio = Platform.select({
      ios: 'hello.m4a',
      android: AudioDirectoryPath,
    });
    resolve(dirHomeAudio)

  })
}


function createDirectory() {
  return new Promise((resolve, reject) => {
    //make app folder
    const AppFolder = 'Mafaza';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    //make audio folder in app folder
    const audioFolder = 'audio';
    const AudioDirectoryPath = DirectoryPath + '/' + audioFolder;
    RNFS.mkdir(AudioDirectoryPath);

    //make document folder in app folder
    const docFolder = 'documents';
    const DocDirectoryPath = DirectoryPath + '/' + docFolder;
    RNFS.mkdir(DocDirectoryPath);


  })
}

export {
  createDirectory,
  getAudioFolderPath,
  // createDocumentFolder
}