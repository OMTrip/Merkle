import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

const PlanList = ({data}) => {
  const renderItem = ({item}) => (
    <View style={styles.planItem}>
      <Text>Amount: Rs {item.rs}</Text>
      <Text>Validity: {item.validity}</Text>
      <Text>Description: {item.desc}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.rs}-${index}`}
      renderItem={renderItem}
    />
  );
};

const PlanTabs = ({plansData}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  // console.log(plansData,"plansdata")
  const {allroute, component} = plansData;
  // const [routes] = useState(Object.keys(plansData));
  const [routes, setRoutes] = React.useState(allroute);
  const renderScene = SceneMap(component);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: 'white'}}
      labelStyle={{color: 'black', width: '100%'}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      sceneContainerStyle={{backgroundColor: '#eee'}}
      
      renderTabBar={props => {
        // console.log(props,"prpe")
        return (
          <TabBar
            {...props}
            tabStyle={{backgroundColor: 'white', width: 'auto'}}
            activeColor="green"
            inactiveColor={'#aaa'}
            // indicatorStyle={{display: 'none'}}
            indicatorStyle={{backgroundColor: 'green'}}
            indicatorContainerStyle={{height: 50}}
            
            labelStyle={{
              fontSize: 14,
              fontWeight: '700',
              padding: 0,
              width: 'auto',
            }}
            scrollEnabled={true}
            //  style={{shadowColor: '#fff', backgroundColor: '#fff'}}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  planItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PlanTabs;
