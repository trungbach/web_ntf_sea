export function checkRole(role) {
  let output = 'Admin';
  switch (role) {
    case 1:
      output = 'Parent';
      break;
    case 2:
      output = 'Protector';
      break;
    case 3:
      output = 'School';
      break;
    default:
  }
  return output;
}
export function checkGender(gender) {
  let output = 'Nam';
  switch (gender) {
    case 1:
      output = 'Nữ';
      break;
    default:
  }
  return output;
}

export function checkChildStatus(status) {
  let output = 'Ở nhà';
  switch (status) {
    case 0:
      output = 'Ở nhà';
      break;
    case 1:
      output = 'Trên xe';
      break;
    case 2:
      output = 'Ở trường';
      break;
    default:
  }
  return output;
}


export function receiveTypeNotify(status) {
  let output = 'Phụ trách';
  switch (status) {
    case 1:
      output = 'Phụ trách';
      break;
    case 2:
      output = 'Phụ huynh';
      break;
    case 3:
      output = 'Toàn trường';
      break;
    default:
  }
  return output;
}


export function statusJourney(status) {
  let output = 'Khởi tạo';
  switch (status) {
    case 0:
      output = 'Khởi tạo';
      break;
    case 1:
      output = 'Đã bắt đầu';
      break;
    case 2:
      output = 'Đã kết thúc';
      break;
    default:
      output = 'Huỷ';
      break;
  }
  return output;
}