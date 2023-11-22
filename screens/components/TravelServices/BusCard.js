import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const BusCard = () => (
  <View style={{flex: 1}}>
    <View>
      <Card
        image={{
          uri: 'https://www.mrmunro.co.uk/wp-content/uploads/2018/08/Cavani-Tommy-Three-Piece-Suit-Worn.jpg',
        }}>
        <Text
          style={{
            marginBottom: 10,
            fontWeight: 'bold',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          $299.99
        </Text>
        <AntDesign
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}
          name="hearto"
          size={30}
          color="black"
        />
        <Text>Grey Suit</Text>
      </Card>
      <Card
        image={{
          uri: 'https://simages.ericdress.com/Upload/Image/2018/14/watermark/99e027f5-1e4f-4b77-93d2-827e0c2db2e7.jpg',
        }}>
        <Text
          style={{
            marginBottom: 10,
            fontWeight: 'bold',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          $299.99
        </Text>
        <AntDesign
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}
          name="hearto"
          size={30}
          color="black"
        />
        <Text>Grey Suit</Text>
      </Card>
    </View>
  </View>
);

export default BusCard;
