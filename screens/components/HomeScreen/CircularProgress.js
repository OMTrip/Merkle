import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle, Image} from 'react-native-svg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const CircularProgress = ({
  radius,
  strokeWidth,
  progress,
  percentageText,
  innerImage,
}) => {
  const circumference = radius * 2 * Math.PI;
  const progressValue = progress * circumference;

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#E6E6E6" // Background color
          fill="none"
          strokeWidth={strokeWidth}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2} // Adjusted radius
        />
        <Circle
          stroke="#14b7af" // Progress color
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2} // Adjusted radius
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progressValue}
        />
       
        <Image
       
          x={radius -15} // Adjust image position as needed
          y={90 } // Adjust image position as needed
          width={30} // Adjust image size as needed
          height={30} // Adjust image size as needed
          href={innerImage}
        />
         <Text
          style={{color: '#000', textAlign:'center', justifyContent:'center', flexDirection:'row', alignItems:'center', top:50,left:5,fontWeight:'bold', fontSize:wp(7)}}
        //   x={radius - 15} // Adjust image position as needed
        //   y={radius - 15} // Adjust image position as needed
          fontSize="12"
          textAnchor="middle"         
          fill="#000000">
            
          {percentageText}
        </Text>
      </Svg>
    </View>
  );
};

export default CircularProgress;
