const map = document.querySelector('.map');
const toast = document.querySelector('.map-toast');

const eveMessage = document.querySelector('.eve-panel__message');

const facilityButtons = document.querySelectorAll('.map-marker');
const missionButtons = document.querySelectorAll('.mission-card');

const facilityData = {
  coaster: {
    locked: false,
    message: '노바 코스터 점검을 시작하세요.',
    toast: 'Nova Control Room으로 이동합니다.'
  },

  luna: {
    locked: true,
    message: 'Luna Light Garden는 잠겨 있습니다.',
    toast: '잠금 해제 조건을 완료하세요.'
  },

  spark: {
    locked: true,
    message: 'Spark Energy Tower는 잠겨 있습니다.',
    toast: '잠금 해제 조건을 완료하세요.'
  },

  wonder: {
    locked: true,
    message: 'Wonder Parade Plaza는 잠겨 있습니다.',
    toast: '잠금 해제 조건을 완료하세요.'
  },

  cosmic: {
    locked: true,
    message: '모든 미션 완료 후 접근 가능합니다.',
    toast: 'Cosmic Voyage가 봉인되어 있습니다.'
  }
};

let toastTimer = null;

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('is-show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 2000);
}

function updateEVE(message) {
  if (!eveMessage) {
    return;
  }

  eveMessage.textContent = message;
}

function handleFacility(id) {
  const facility = facilityData[id];

  if (!facility) {
    return;
  }

  updateEVE(facility.message);

  if (facility.locked) {
    showToast(facility.toast);
    return;
  }

  showToast(facility.toast);

  // TODO:
  // control room 화면으로 이동
}

function handleClick(event) {
  const id = event.currentTarget.dataset.facility;

  handleFacility(id);
}

facilityButtons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

missionButtons.forEach((button) => {
  button.addEventListener('click', handleClick);
});