import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CurvedBackground = () => {
  return (
    <View style={{ flex: 1 }}>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
        // style={{ position: 'absolute', bottom: 0 }}
      >
        <Path
          fill="#0099ff"
          d="M0,64L60,64C120,64,240,64,360,90.7C480,117,600,171,720,170.7C840,171,960,117,1080,101.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>
    </View>
  );
};

export default CurvedBackground;
