import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';

const DoctorSignup3 = ({navigation}) => {
  const [filePath, setFilePath] = useState([]);
  const refRBSheet = useRef();
  const [imageSelected, setimageSelected] = useState(false);
  const DoctorData = navigation.getParam('DoctorData');
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      ImagePicker.launchCamera(options, (response) => {
        if (response != '') {
          if (response.didCancel) {
            console.log('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            console.log('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            console.log('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            console.log(response.errorMessage);
            return;
          }
          refRBSheet.current.close();
          setimageSelected(true);
          setFilePath(response.assets[0]);
        }
      });
    }
  };
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response != '') {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        refRBSheet.current.close();
        setimageSelected(true);
        setFilePath(response.assets[0]);
      }
    });
  };
  const DisplayBottomSheet = () => {
    refRBSheet.current.open();
  };
  const HandleContinue = () => {
    if (filePath != '') {
      DoctorData.DoctorImage = filePath;
      setLoading(true);
      signInWithPhoneNumber();
    } else {
      alert('Kindly Select Image');
    }
  };
  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(DoctorData.DoctorNumber);
      setLoading(false)
      navigation.navigate('DoctorOtpScreen', {
        DoctorData: DoctorData,
        Confirmation: confirmation,
      });
    } catch (e) {
      setLoading(false)
      alert('Try again Later');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.innerView}>
           
            <View style={styles.imageView}>
              {imageSelected ? (
                <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
              ) : (
                <Image
                  source={require('../../../assets/Images/doctor.png')}
                  style={styles.imageStyle}
                />
              )}

              <TouchableOpacity
                style={styles.cameraimage}
                onPress={() => DisplayBottomSheet()}>
                <Image
                  source={require('../../../assets/Images/camera.png')}
                  style={[styles.BTVImage, {marginTop: 10}]}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 40}}>
              <Text style={styles.termconditionheading}>
                Terms &amp; Conditions
              </Text>
              <Text style={styles.termconditiontext}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => HandleContinue()}
              style={styles.Btndesign}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.Btntext}>Continue to Step 6</Text>
              )}            
            </TouchableOpacity>
          </View>

          <RBSheet
            ref={refRBSheet}
            height={150}
            customStyles={{container: styles.Bottomsheetstyle}}>
            <View style={styles.GalleryandcameraView}>
              <TouchableOpacity
                onPress={() => chooseFile('photo')}
                style={[styles.Galleryandcamerabtn, {marginRight: 10}]}>
                <Image
                  source={require('../../../assets/Images/OpenGallery.png')}
                />
                <Text style={styles.Galleryandcameratext}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => captureImage('photo')}
                style={[styles.Galleryandcamerabtn, {marginLeft: 10}]}>
                <Image
                  source={require('../../../assets/Images/Opencamera.png')}
                />
                <Text style={styles.Galleryandcameratext}>Camera</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default DoctorSignup3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Colors.White,
  },
  innerView: {
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  BackandTextView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
  },
  BTVtext: {
    color: color.Colors.Blue,
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 22,
    marginLeft: 6,
  },
  BTVImage: {
    resizeMode: 'contain',
    marginTop: 4,
  },
  Btndesign: {
    backgroundColor: color.Colors.Orange,
    width: '100%',
    height: 62,
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Btntext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 20,
    color: color.Colors.White,
  },
  termconditionheading: {
    color: color.Colors.Orange,
    fontSize: 16,
    fontFamily: font.fonts.PoppinsBold,
  },
  termconditiontext: {
    marginTop: 7,
    textAlign: 'justify',
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 14,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  imageView: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: color.Colors.Orange,
    marginTop: 50,
    alignSelf: 'center',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 100,
    // resizeMode:'contain'
  },
  cameraimage: {
    height: 30,
    width: 30,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
  },
  Bottomsheetstyle: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  GalleryandcameraView: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  Galleryandcamerabtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Galleryandcameratext: {
    marginTop: 2,
    color: 'black',
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 14,
  },
  imgView: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 50,
  },
});
