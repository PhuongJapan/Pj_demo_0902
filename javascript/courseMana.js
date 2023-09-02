let studentManagement = JSON.parse(localStorage.getItem("studentManagement"))||[];
document.getElementById("btnLogout").addEventListener("click", function(){
    //Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");
    //Điều hướng về Login
    window.location.href="login.html"
})
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];

let action= "Create";
//Phân trang

let currentPage=1;
let recordsPerPage=3;

function renderData(page) {
    // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //Hiển thị số trang
    let totalPage=getTotalPage();
    let listPage = document.getElementById("listPage")
    listPage.innerHTML="";
    for (let i = 1; i <= totalPage.length; i++) {
        listPage.innerHTML += `
       <li><a href="javascript:renderData('${i}')">${i}</a></li>
       `;        
    }
    // Nếu ở trang 1 thì ẩn preview còn nếu ở trang cuối thì ẩn next
    if (page == 1) {
        document.getElementById("preview").style.visibility = "hidden";
      } else {
        document.getElementById("preview").style.visibility = "visible";
      }
      if (page == totalPage) {
        document.getElementById("next").style.visibility = "hidden";
      } else {
        document.getElementById("next").style.visibility = "visible";
      }
    //Tính index của dữ liệu hiển thị trên table
      let firstIndex=(page-1)*recordsPerPage;
      let lastIndex=page*recordsPerPage;
      if (lastIndex>arrCourse.length) {
        lastIndex= arrCourse.length;
      }
    let listCourse = document.getElementById("listCourse");
    listCourse.innerHTML = "";
    //forEach(functionCallback,thisValue)
    //functionCallback(element,index,arr)
    // arrCourse.forEach((course, index) => {
    for (let index = firstIndex; index < lastIndex; index++) {  
        listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrCourse[index].courseId}</td>
                <td>${arrCourse[index].courseName}</td>
                <td>${arrCourse[index].courseTime}</td>
                <td>${arrCourse[index].status ? "Hoạt động" : "Không hoạt động"}</td>
                <td>
                    <i class="fa-solid fa-pen-to-square" id="editCourse" a href="#" onclick="displayDataToUpdate('${
                        arrCourse[index].courseId }')"></i>
                    <i class="fa-solid fa-trash" id="deleteCourse" a href="#" onclick="deleteCourse('${
                        arrCourse[index].courseId }')"></i>
                </td>
            </tr>
        `;
    }
}

function getTotalPage() {
    return Math.ceil(arrCourse.length / recordsPerPage);
  }

function clickPage(page) {
    currentPage=page;
    // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderData(page,arrCourse);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    // let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderData(currentPage, arrCourse);
  }
  // Hàm nextPage
  function nextPage() {
    currentPage++;
    // let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderData(currentPage,arrCourse);
  }  

var newCourseModal = new bootstrap.Modal(document.getElementById("newCourse"), {
    keyboard: false
})

function createCourse() {
    //1. Lấy dữ liệu arrCourse từ localStorage
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //2. Lấy dữ liệu trên modal
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let status = document.querySelector("input[type='radio']:checked").value == "true" ? true : false;
    let newCourse = { courseId, courseName, courseTime, status, arrClass: [] };
    if (!validateCourse(courseId)) {
        return;
      }
      if (!validateCourseName(courseName)) {
        return;
      }
// document.getElementById("btnCreateCourse").addEventListener("click", function () { 
    //3. push dư liệu thêm mới vào arrCourse
    arrCourse.push(newCourse);
    //4. Đẩy arrCourse vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    //5. Đóng modal
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").checked = true;
    newCourseModal.hide();
    //6. render lại dữ liệu
    renderData(currentPage);
}
function redirectDashboard() {
    window.location.href="dashboard.html";
};
function redirectCourseManagement() {
    window.location.href="courseMana.html";
}
function redirectClassManagement() {
    window.location.href="classMana.html";
}
function redirectStudentManagement() {
    window.location.href="studentMana.html";
}
window.onload = renderData(currentPage);