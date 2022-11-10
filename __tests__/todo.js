const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
/* eslint-disable no-undef */
describe("To do list test suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo0",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add one to-do", () => {
    const todoCount = all.length;
    add({
      title: "Test todo1",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoCount + 1);
  });
  test("Should mark a to-do as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should retrieve overdue items", () => {
    let overdue_list = overdue();
    let count = overdue_list.length;
    add({
      title: "Test todo2",
      completed: false,
      dueDate: yesterday,
    });
    overdue_list = overdue();
    expect(overdue_list.length).toBe(count + 1);
  });
  test("Should retrieve due today items", () => {
    let dueToday_list = dueToday();
    let count = dueToday_list.length;
    add({
      title: "Test todo3",
      completed: false,
      dueDate: today,
    });
    dueToday_list = dueToday();
    expect(dueToday_list.length).toBe(count + 1);
  });
  test("Should retrieve due later items", () => {
    let dueLater_list = dueLater();
    let count = dueLater_list.length;
    add({
      title: "Test todo4",
      completed: false,
      dueDate: tomorrow,
    });
    dueLater_list = dueLater();
    expect(dueLater_list.length).toBe(count + 1);
  });
});
