// 1. 先找到页面上的那几个东西（输入框、按钮、列表）
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const qd = document.getElementById('qd');
const sy = document.getElementById('sy');
const sw = document.getElementById('sw');

let tasks = [];
// 2. 给“添加任务”按钮设置一个监听器，告诉它：”如果有人点你，你就执行后面的函数“
addBtn.addEventListener('click', function() {
    // 3. 获取用户输入框里的内容
    const taskText = taskInput.value;

    // 4. 如果输入框是空的，就不执行
    if (taskText === '') {
        alert('请输入任务！');
        return;
    }
    if(taskList.children.length >= 10){
	alert('任务太多啦，先完成一些吧')
	return;
    }

    // 5. 创建一个新的列表项 <li>
    const newTask = document.createElement('li');
    // 把输入的文字放进去
    newTask.textContent = taskText;
    
    // 6. 给这个新任务也加一个点击删除的功能
     newTask.addEventListener('click', function(){
	if(this.style.textDecoration === 'line-through'){
		this.style.textDecoration = 'none';
		this.style.color = 'black';
        gengxin();
	}else{
         	this.style.textDecoration = 'line-through';
         	this.style.color = 'gray'; // 点一下自己，就把自己从页面上移除
            gengxin();
                }
    });
    newTask.addEventListener('dblclick', function() {
        xiugai(this); // 点一下自己，就把自己从页面上移除
    });

    // 7. 把这个新任务添加到列表里
    taskList.appendChild(newTask);
    gengxin();

    // 8. 清空输入框
    taskInput.value = '';
});

// 9. 别忘了，页面刚加载时，那两个手动写的例子也要能点击删除
// 找到所有已经存在的 <li>
const existingTasks = document.querySelectorAll('#taskList li');
// 给它们每一个都加上点击删除的功能
existingTasks.forEach(function(task) {
    task.addEventListener('click',function(){
         	if(task.style.textDecoration === 'line-through'){
		task.style.textDecoration = 'none';
		task.style.color = 'black';
        gengxin();
	}else{
         	task.style.textDecoration = 'line-through';
         	task.style.color = 'gray'; // 点一下自己，就把自己从页面上移除
            gengxin();
                } 
    });
    task.addEventListener('dblclick', function() {
        xiugai(task);
    });
});

//删除已完成
qd.addEventListener('click',function(){
	const eexistingTasks = document.querySelectorAll('#taskList li');
	const xinList = [];
	eexistingTasks.forEach(function(task){
 		if(task.style.textDecoration === 'line-through'){
			xinList.push(task);
		}
	});
	xinList.forEach(function(task){
		task.remove();
	});
    gengxin();
});

//全部已完成
sy.addEventListener('click',function(){
    const suoyi = document.querySelectorAll('#taskList li');
    suoyi.forEach(function(task){
        if(task.style.textDecoration !== 'line-through'){
            task.style.textDecoration = 'line-through';
            task.style.color = 'gray';
        }
    });
    gengxin();
});
//全部未完成
sw.addEventListener('click',function(){
    const suowei = document.querySelectorAll('#taskList li');
    suowei.forEach(function(task){
        if(task.style.textDecoration === 'line-through'){
            task.style.textDecoration = 'none';
            task.style.color = 'black';
        }
    });
    gengxin();
});

loadTasks();
renderTasks();
