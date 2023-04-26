const addBtn = document.querySelectorAll('.btn-add');
const saveBtn = document.querySelector('.save-memo');
const editBtn = document.querySelector('.edit-memo')
const table = document.querySelector('table');
const closeFormBtn = document.querySelectorAll('.close-form')
const startDate = document.querySelector('#start-date')
const endDate = document.querySelector('#end-date')
const deleteBtn = document.querySelector('.delete-form')
const p = document.querySelectorAll('tr td p') 
const form = document.querySelector('.edit-form')
const sideBar = document.querySelector('.sidebar-container')
const sideBarBtn = document.querySelector('.btn-toggle')
// 이벤트 위임 활용해서 모달창 보여주기
table.addEventListener('click',function(e){
  const addForm = document.querySelector('.black-bg');
  const editForm = document.querySelector('.black-bg2');
  const memoEls = document.querySelectorAll('.memo');
    if(e.target.classList.contains('btn-add')){
        addForm.classList.add('show-modal');
    }
    if(e.target.classList.contains('memo')){
      editForm.classList.add('show-modal')
    }
})



// 폼 모달창 닫기 버튼
closeFormBtn[0].addEventListener('click',function(){
  const addForm = document.querySelector('.black-bg');
    addForm.classList.remove('show-modal')
})
closeFormBtn[1].addEventListener('click',function(){
  const editForm = document.querySelector('.black-bg2');
  editForm.classList.remove('show-modal')
})


// 모달창 저장 버튼

// 메모
class Memo{
    constructor(title,color,content,startDate,endDate){
        this.title = title;
        this.color = color;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

function saveMemo(){
    // 폼에 입력한 값들을 받아온다.
    const memotTitle = document.getElementById('title').value;
    const memoColor = document.getElementById('color').value;
    const memoContent = document.getElementById('content').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const memo = new Memo(memotTitle,memoColor,memoContent,startDate,endDate);
    if(!localStorage.getItem('memo')){
        localStorage.setItem('memo',JSON.stringify([memo]))
    }else if (localStorage.getItem('memo')){
        let temp = JSON.parse(localStorage.getItem('memo'))
        temp.push(memo)
        localStorage.setItem('memo',JSON.stringify(temp))
    }
}

saveBtn.addEventListener('click',saveMemo)

function loadMemo() {
    const memoData = JSON.parse(localStorage.getItem('memo'));
  
    // memo 데이터가 존재하면
    if (memoData && memoData.length > 0) {
      memoData.forEach(memo => {
        // 시작일, 종료일 구하기
        const startMonth = parseInt(memo.startDate.slice(5, 7));
        const startDate = parseInt(memo.startDate.slice(8, 10));
        const endDate = parseInt(memo.endDate.slice(8, 10));
  
        // 시작일에서 종료일까지 캘린더에 메모 추가하기
        for (let i = startDate; i <= endDate; i++) {
          let days = document.querySelectorAll('tr td div');
          days.forEach(day => {
            let dayNum = parseInt(day.textContent);
            let month = parseInt(document.querySelector('.month').textContent);
            if (dayNum === i && month === startMonth) {
              const memoEl = document.createElement('p');
              memoEl.classList.add('memo');
              memoEl.style.backgroundColor = memo.color;
              memoEl.innerHTML = `${memo.title}`;
              day.appendChild(memoEl);
            }
          })
        }
      })
    }
  }
loadMemo()

function openEditForm(memoData) {
  const form = document.querySelector('.edit-form');
  const formTitle = form.querySelector('#edit-title');
  const formColor = form.querySelector('#edit-color');
  const formContent = form.querySelector('#edit-content');
  const formStartDate = form.querySelector('#edit-start-date');
  const formEndDate = form.querySelector('#edit-end-date');

  formTitle.value = memoData.title;
  formColor.value = memoData.color;
  formContent.value = memoData.content;
  formStartDate.value = memoData.startDate;
  formEndDate.value = memoData.endDate;

  form.classList.add('show-modal');
}

function addEditMemoEvent() {
  const memoEls = document.querySelectorAll('.memo');
  memoEls.forEach(memoEl => {
    memoEl.addEventListener('click', function() {
      const memoTitle = memoEl.innerHTML;
      const memoData = JSON.parse(localStorage.getItem('memo')).find(memo => memo.title === memoTitle);
      openEditForm(memoData);
    });
  });
}
addEditMemoEvent()


// 수정 버튼 누르면 실행되는 함수
function editMemo() {
  // 선택된 메모의 정보 가져오기
  const memoTitle = document.querySelector('#edit-title').value;
  const memoColor = document.querySelector('#edit-color').value;
  const memoContent = document.querySelector('#edit-content').value;
  const memoStartDate = document.querySelector('#edit-start-date').value;
  const memoEndDate = document.querySelector('#edit-end-date').value;

  // 로컬 스토리지에서 해당 메모 찾기
  let memoData = JSON.parse(localStorage.getItem('memo'));
  const memoIndex = memoData.findIndex(memo => memo.title === memoTitle);
  
  // 메모 수정
  memoData[memoIndex].color = memoColor;
  memoData[memoIndex].content = memoContent;
  memoData[memoIndex].startDate = memoStartDate;
  memoData[memoIndex].endDate = memoEndDate;

  // 수정된 메모 저장
  localStorage.setItem('memo', JSON.stringify(memoData));

  // 캘린더에서 수정된 메모 보여주기
  const memoEls = document.querySelectorAll('.memo');
  memoEls.forEach(memoEl => {
    if (memoEl.innerHTML === memoTitle) {
      memoEl.style.backgroundColor = memoColor;
      memoEl.parentNode.removeChild(memoEl);
    }
  });
  for (let i = parseInt(memoStartDate.slice(8, 10)); i <= parseInt(memoEndDate.slice(8, 10)); i++) {
    const days = document.querySelectorAll('tr td div');
    days.forEach(day => {
      const dayNum = parseInt(day.textContent);
      const month = parseInt(document.querySelector('.month').textContent);
      if (dayNum === i && month === parseInt(memoStartDate.slice(5, 7))) {
        const memoEl = document.createElement('p');
        memoEl.classList.add('memo');
        memoEl.style.backgroundColor = memoColor;
        memoEl.innerHTML = `${memoTitle}`;
        day.appendChild(memoEl);
      }
    });
  }
}
editBtn.addEventListener('click',editMemo)


// 메모 삭제 함수
function deleteMemo(){
  const memoTitle = document.querySelector('#edit-title').value;
  let memoData = JSON.parse(localStorage.getItem('memo'));

  // 로컬스토리지에서 해당 메모 삭제
  // filter 함수를 통해 메모 제목이 다른 객체들만 return 해준다
  memoData = memoData.filter(memo => memo.title !== memoTitle);
  localStorage.setItem('memo',JSON.stringify(memoData));
  loadMemo()

  // 캘린더에서 해당 메모 삭제
  const memoElemnets = document.querySelectorAll('.memo');
  memoElemnets.forEach((memoElemnet)=>{
    if(memoElemnet.innerHTML === momoTitle){
      memoElemnet.remove();
      loadMemo()
    }
  })

}
// deleteBtn.addEventListener('click',deleteMemo)

// 이벤트 위임 활용해서 모달창 보여주기
form.addEventListener('click',deleteMemo)

