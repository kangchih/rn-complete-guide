import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'


export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  // console.log('RE-RENDERING COMPONENTS');
  console.log(courseGoals);


  // function goalInputHandler(enteredText){
  //   setEnteredGoal(enteredText);
  // }

  const addGoalHandler = goalTitle => {
    // console.log(enteredGoal)
    if (goalTitle.length === 0){
      return;
    }
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false)
  };

  const removeGoalHandler = goalId => {
    console.log('To Be Deleted: ' + goalId);
    console.log(courseGoals);

    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAdditionalHandler = () => {

    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionalHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData =>
          <GoalItem id={itemData.item.id}
            onDelete={removeGoalHandler.bind(this, itemData.item.id)}
            title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
