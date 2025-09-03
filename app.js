document.addEventListener('DOMContentLoaded', function() {
    const teamForm = document.getElementById('team-form');
    const teamList = document.getElementById('team-list');
    
    // 存储组队信息
    let teams = [];
    let currentUser = Math.random().toString(36).substring(2, 10); // 简单生成用户标识
    
    // 表单提交处理
    teamForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const course = document.getElementById('course').value;
        const description = document.getElementById('description').value;
        const contact = document.getElementById('contact').value;
        
        // 创建新组队信息
        const newTeam = {
            id: Math.random().toString(36).substring(2, 10),
            course,
            description,
            contact,
            date: new Date().toLocaleDateString(),
            completed: false,
            creator: currentUser
        };
        
        // 添加到数组
        teams.unshift(newTeam);
        
        // 清空表单
        teamForm.reset();
        
        // 更新列表
        renderTeamList();
    });
    
    // 渲染组队列表
    function renderTeamList() {
        teamList.innerHTML = '';
        
        if (teams.length === 0) {
            teamList.innerHTML = '<p class="text-muted">暂无组队信息</p>';
            return;
        }
        
        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = `team-card ${team.completed ? 'completed' : ''}`;
            teamCard.innerHTML = `
                <h5>${team.completed ? '(已组队) ' : ''}${team.course}</h5>
                <p>${team.description}</p>
                <p class="text-muted">发布于: ${team.date}</p>
                <p class="contact-info">联系方式: ${team.contact}</p>
                ${team.creator === currentUser ? 
                  `<button class="btn btn-sm ${team.completed ? 'btn-secondary' : 'btn-success'}" 
                    onclick="markCompleted('${team.id}')">
                    ${team.completed ? '已组队' : '标记为已组队'}
                  </button>` : ''}
            `;
            teamList.appendChild(teamCard);
        });
        
        // 添加标记完成函数
        window.markCompleted = function(id) {
            const team = teams.find(t => t.id === id);
            if (team) {
                team.completed = !team.completed;
                renderTeamList();
            }
        };
    }
    
    // 初始渲染
    renderTeamList();
});