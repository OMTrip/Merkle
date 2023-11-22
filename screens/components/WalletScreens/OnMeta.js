import {View, StyleSheet, Text, Linking} from 'react-native';
import WebView from 'react-native-webview';
import HomeHeader from '../HomeScreen/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default function OnMeta(props) {
    const{fiat,item} = props.route.params.data
    console.log(fiat,item,"fiat,item")
  const onRampHTMLCode = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="https://stg.platform.onmeta.in/onmeta-sdk.js" type="text/javascript"></script>
  </head>
  <body>
  <div id="widget"> </div>
  <script>
  let createWidget=new onMetaWidget({
    elementId:"widget",
    apiKey:"a2410220-5fd6-46a0-bf21-872ad1646dca",
    userEmail:"rajneeshnadacb@gmail.com",
    fiatAmount:${fiat},
    chainId: ${item.chainId},
    isAndroid:"enabled", 
  })
  createWidget.init();
  createWidget.on("ACTION_EVENTS",(data)=>{window.ReactNativeWebView.postMessage(JSON.stringify(data))}) 
  </script>
  </body>
  </html>
  `;
  const onRampEvent = event => {
    const eventData = JSON.parse(event?.nativeEvent?.data);
    if (eventData?.data?.type === 'UPI_FAST') {
      void Linking.openURL(eventData.data.link);
    }
  };
  return (
    <View style={styles.container}>
        <View         
          style={{
            // height: hp(10),
            paddingVertical: wp(3),
            justifyContent: 'center',
            paddingHorizontal: hp(2),
            backgroundColor:'#000'
          }}>
        <HomeHeader
          icons={true}
          iconName={'keyboard-backspace'}
          size={wp(8)}
          title={'OnMeta'}
          TextTitle={true}
          //   leftIocnsSubScreen={true}
          LeftIconsName={'magnify'}
        />
      </View>
      {/* <Text>Onmeta</Text> */}
      <WebView
        originWhitelist={['*']}
        style={{minWidth:"100%"}}
        mixedContentMode="compatibility"
        source={{html: onRampHTMLCode}}
        renderLoading={() => {
          return <Text>Loading.......</Text>;
        }}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures
        scalesPageToFit={true}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        domStorageEnabled={true}
        onMessage={event => {
          onRampEvent(event);
        }}></WebView>
    </View>
  );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#F3F4F7',
    //   paddingHorizontal: wp(5),
    }
  
  });