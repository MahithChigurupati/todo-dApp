//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract todo{

    uint totalItems = 0;

    mapping(uint=>todoItem) public todoList;

    struct todoItem{
        uint itemID;
        string itemName;
        bool status;
        uint completedTime;
    }

    function createTodo(string memory item) public{
        todoList[totalItems] = todoItem(totalItems,item,false,0);
        totalItems++;
        
    }

    function setStatus(uint index) public{
        if(!todoList[index].status){
            todoList[index].completedTime = block.timestamp;

        }else{
            todoList[index].completedTime = 0;
        }
        todoList[index].status = !todoList[index].status;
    }
}