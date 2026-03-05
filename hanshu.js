//编辑保存函数
function saveEdit(task, input) {
    // 1. 获取输入框里的新文字
    const newText = input.value.trim();  // trim() 去掉开头和结尾的空格
    
    // 2. 如果新文字不为空，就更新任务文字
    if (newText !== '') {
        task.textContent = newText;
    } else {
        // 如果用户删光了所有文字，就恢复原来的文字
        // 这里简单处理：不保存，恢复原样
        task.textContent = input.defaultValue;  // defaultValue 就是输入框刚创建时的值
    }
    
    // 3. 恢复任务的单击切换和双击编辑功能
    // 注意：因为 task.textContent 被重新赋值，之前绑定的点击事件还在吗？
    // 答案是：还在！事件是绑在元素本身上的，不是绑在文字上的。
    // 但我们还是需要重新给这个任务绑定双击编辑，因为原来的双击事件被覆盖了吗？
    // 我们来仔细想想...
    
    // 安全起见，我们重新绑定一下双击事件
    
}

//修改任务函数
function xiugai(task) {
    // 1. 保存原来的文字
    const oldText = task.textContent;
    
    // 2. 创建一个输入框
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText;
    input.className = 'edit-input';  // 给输入框加个类名，方便后面加样式
    input.defaultValue = oldText;
    // 3. 清空任务里的内容，把输入框放进去
    task.textContent = '';
    task.appendChild(input);
    
    // 4. 让输入框自动获得焦点（这样用户可以直接打字，不用再点一下）
    input.focus();
    
    // 5. 处理输入框失去焦点的事件（保存编辑）
    input.addEventListener('blur', function() {
        saveEdit(task, input);
    });
    
    // 6. 处理输入框按回车的事件（也是保存编辑）
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveEdit(task, input);
        }
    });
}

//统计任务函数
function gengxin() {
    const allTasks = document.querySelectorAll('#taskList li');
    const total = allTasks.length;
    
    let completed = 0;
    allTasks.forEach(function(task) {
        if (task.style.textDecoration === 'line-through') {
            completed++;
        }
    });
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
}
