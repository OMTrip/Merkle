// import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';

// const usersCollection = firestore().collection('users');
// const transactionsCollection = firestore().collection('transactions');
// const tokensCollection = firestore().collection('tokens');

const userCollection = {
  getUser: async docname => {
    try {
      const res = (await usersCollection.doc(docname).get()).data();
      // console.log(res, ' res');
      return res;
    } catch (e) {
      return undefined;
    }
  },
  addUser: async paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
    const res = (await usersCollection.doc(docname).get()).data();
    if (!res) {
      usersCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('User added!');
        });
    } else {
      console.log('user aleardy exist');
    }
  },
  updateUser: paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
   return usersCollection
      .doc(docname)
      .update(paramobj)
      .then(() => {
        console.log('User updated!');
        return true;
      });
  },
  // deleteUser: () => {
  //   firestore()
  //     .collection('users')
  //     .doc('user2')
  //     .delete()
  //     .then(() => {
  //       console.log('user document deleted!');
  //     });
  // },
  checkUser: async number => {
    const docname = number;
    const res = (await usersCollection.doc(docname).get()).data();
    return res ? true : false;
  },
};


export const transactionCollection = {
  getTransaction: async docname => {
    try {
      const res = await transactionsCollection.where("phoneNumber", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());       
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addTransaction: async paramobj => {
    const docname = paramobj.order_id;
    // console.log(docname);
    const res = (await transactionsCollection.doc(docname).get()).data();
    if (!res) {
      transactionsCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('Transaction added!');
        });
    } else {
      console.log('Transaction orderid already exist');
    }
  },

};

export const tokenCollection = {
  getTokens: async docname => {
    try {
      const res = await tokensCollection.where("walletAddress", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());       
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addTokens: async paramobj => {
    const docname = paramobj.txHash;
    // console.log(docname);
    const res = (await tokensCollection.doc(docname).get()).data();
    if (!res) {
      tokensCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('Token added!');
        });
    } else {
      console.log('Tx already exist');
    }
  },

};

const applicationfilesstorage = {
  uploadfile: async () => {},
  getfile: () => {},
  delete: () => {},
};

export default userCollection;

export {applicationfilesstorage};
