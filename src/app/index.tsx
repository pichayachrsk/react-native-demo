import { ScrollView, Text, View, StyleSheet } from "react-native";
import questionData from "../../data/questions.json";
import { useEffect, useState } from "react";

interface QuestionInfo {
  id: number;
  question: string;
  options: string[];
}

export default function Index() {
  const [questions, setQuestions] = useState<QuestionInfo[]>([]);

  const randomizeQuestions = (arr: QuestionInfo[]) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = arr[i].options.length - 1; j > 0; j--) {
        const randomIndex = getRandomIndex(j);
        [arr[i].options[j], arr[i].options[randomIndex]] = [
          arr[i].options[randomIndex],
          arr[i].options[j],
        ];
      }
      const randomIndex = getRandomIndex(i);
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    setQuestions(arr);
  };

  const getRandomIndex = (index: number): number => {
    return Math.floor(Math.random() * (index + 1));
  };

  useEffect(() => {
    randomizeQuestions(questionData.questions);
  }, []);

  const styles = StyleSheet.create({
    lineStyle: {
      borderBottomWidth: 1,
      borderColor: "black",
      marginVertical: 10,
    },
  });
  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        {questions.map((item, itemIndex) => (
          <View key={`question${item.id}`}>
            <Text style={{ fontWeight: "bold" }}>
              Question {itemIndex + 1} : {item.question}
            </Text>
            {item.options.map((option, index) => (
              <Text key={`question${itemIndex}-option${index}`}>
                {" "}
                - {option}
              </Text>
            ))}
            <View style={styles.lineStyle} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
