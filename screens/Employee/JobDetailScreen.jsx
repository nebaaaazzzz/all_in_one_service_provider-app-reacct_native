import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Divider } from "react-native-paper";

const JobDetailScreen = () => {
  const dimension = useWindowDimensions();
  return (
    <View>
      <ScrollView
        style={{ marginTop: StatusBar.currentHeight, marginBottom: 60 }}
      >
        <Text style={{ textAlign: "center", fontSize: 25 }}>
          AI ML consultant for financial start-up
        </Text>
        <Divider />
        <Text style={{ color: "rgba(0,0,0,0.6)", marginLeft: 20 }}>
          Posted 16 hours ago
        </Text>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginVertical: 10 }}>
            Hello there, I am Vick, Me and my small team is working on a Fintech
            start-up in the consumer finance space (USA). We are an early-stage
            start-up working remotely, We just finished our MVP and preparing to
            automate a few things through simple and complex ML algorithms for
            our BETA. We have a clear goal and view about how our product should
            be.
          </Text>
          <Text style={{ marginVertical: 10 }}>
            So, we need an experienced person in ML who could understand the
            business and product needs and help us to plan and navigate through
            the process of building models and deploying them in real-time. In
            the beginning, we need consulting on how to use ML to get the
            results we needed, and if we get along we can discuss the next
            process.
          </Text>

          <Text style={{ marginVertical: 10 }}>
            So, If you think you'll be the right fit for our needs, then please
            apply with a cover letter. We can have an initial consulting section
            first and see where it takes us.
          </Text>
          <Text> Note: NDA should be signed.</Text>
          <Text style={{}}>Thank you -Vick</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical: 20,
          }}
        >
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Less than 30hrs/week</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hourly</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>1-3 months</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Duration</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Expert</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Experience Level</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>$15.00-$30.00</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hourly</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Remote Job</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Complex project</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Project Type</Text>
          </View>
        </View>
        <Divider />
        <View>
          <Text style={{ margin: 20, fontSize: 18, fontWeight: "bold" }}>
            Skills and Expertise
          </Text>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              Machine Learning Deliverables
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  padding: 5,
                  margin: 2,
                }}
              >
                Machine Learning Model
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                +2 more
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Machine Learning Tools</Text>
            <View>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                Amazon SageMaker
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold" }} h>
              Other
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                Machine Learning
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                Pythin
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                Artificail Intelligence
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                Data Science
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                Natural Language Processing
              </Text>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                  margin: 2,

                  padding: 5,
                }}
              >
                + 3 more
              </Text>
            </View>
          </View>
          <Divider />
          <View>
            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold" }}>
              Activity on this Job
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Proposals
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                15 to 20
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Last viewed by client
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                3 hours ago
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Interviewing
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Invites sent
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Unasnwered invited
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                0
              </Text>
            </View>
            <Divider />
          </View>
          <View>
            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold" }}>
              About the client
            </Text>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>India</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>Erode 2:44 am</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text>39 JOBS POSTED</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                49% hire rate , 2 open jobs
              </Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text>8.51/hr avg rate paid</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>149 hours</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text>Small company 2-9 people</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>149 hours</Text>
            </View>
            <Text
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Member since Apr 26,2020
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          height: 60,
          alignItems: "flex-end",
          width: "100%",
          top: dimension.height - 60,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
          position: "absolute",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0099ff",
            width: 100,
            marginRight: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JobDetailScreen;
