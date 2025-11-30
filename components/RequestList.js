import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "../styles/styles";
import RequestItem from "./RequestItem";

const RequestList = ({ requests }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.emptyText}>No requests found</Text>
      ) : (
        requests.map((req) => <RequestItem key={req.id} request={req} />)
      )}
    </View>
  );
};

export default RequestList;