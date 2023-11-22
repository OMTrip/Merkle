import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {WebView} from 'react-native-webview';

const AuditToken = ({ jsonData }) => {
    function stripHtmlTags(html) {
        console.log(html.replace(/<[^>]*>?/gm, ''),"html.replace(/<[^>]*>?/gm, '')")
        return html.replace(/<[^>]*>?/gm, '');
      }
  return (
    <ScrollView style={styles.reportWrapper}>
      <Text style={styles.heading}>Scan Report</Text>
      <View style={styles.infoSection}>
        <InfoItem label="Compiler Version" value={jsonData.scan_report.compilerversion} />
        <InfoItem label="Contract Address" value={jsonData.scan_report.contract_address} />
        <InfoItem label="Contract Chain" value={jsonData.scan_report.contract_chain} />
        <InfoItem label="Contract Platform" value={jsonData.scan_report.contract_platform} />
        <InfoItem label="Currency" value={jsonData.scan_report.currency} />
        <InfoItem label="License Type" value={jsonData.scan_report.licensetype} />
      </View>

      <Text style={styles.heading}>Quick File Scan Details</Text>
      <View style={styles.quickScanDetails}>
        {jsonData.scan_report.quick_file_scan_details.map((detail, index) => (
          <View style={styles.issue} key={index}>
            <Text style={styles.issueHeading}>{detail.issue_name}</Text>
            <Text style={styles.issueDescription}>{stripHtmlTags(detail.issue_description)}</Text>
 
            <Text style={[styles.issueStatus,{color:"#000"}]}>Issue Status: {detail.issue_status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginVertical: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 150,
  },
  value: {
    flex: 1,
  },
  quickScanDetails: {
    marginTop: 10,
    color:"#000"
  },

  
  reportWrapper: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingBottom:30,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',   
    flex: .85,
  },

  issue: {
    borderWidth: .5,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  issue_name:{
    color:"#000"
  },
  issueHeading: {
    fontSize: 20,
    marginTop: 0,
    color:"#000"
  },
  issueDescription: {
    marginTop: 10,
    fontSize: 16,
    color:"#444"
  },
  issueStatus: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default AuditToken;
