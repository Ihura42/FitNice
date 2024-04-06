function hideSidebar(){
    const sidebar = document.querySelector(".home-sidebar")
    sidebar.style.display = 'none'
}

function showSidebar(){
    const sidebar = document.querySelector(".home-sidebar")
    sidebar.style.display = 'flex'
}


document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.home-slider');

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('img');
        const prevBtn = slider.parentElement.querySelector('.home-pre-btn');
        const nextBtn = slider.parentElement.querySelector('.home-next-btn');
        const slideWidth = slides[0].offsetWidth + 20;
        let currentIndex = 0;

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 4) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSliderPosition();
        });

        function updateSliderPosition() {
            const offset = -currentIndex * slideWidth;
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.transform = `translateX(${offset}px)`;
            }
        }
    });
});

function showModal(cardIndex) {
    var modal = document.getElementById('myModal'+ cardIndex);
    var modalText = document.getElementById('modal-text');
    var content = "";
  
    modal.style.display = 'block';
    modalText.innerText = content;
  }
  
  function closeModal(modalId) {
      var modal = document.getElementById(modalId);
      modal.style.display = 'none';
    }
    
    
    var closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var modalId = this.closest('.modal').id;
        closeModal(modalId);
      });
    });
    
    
    window.addEventListener('click', function(event) {
      var modals = document.querySelectorAll('.modal');
      modals.forEach(function(modal) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });
    });
  
    document.querySelectorAll('.add-exercise-btn').forEach(button => {
      button.addEventListener('click', () => {
          
        
          const cardDetails = button.closest('.card-ex').querySelector('.exercise-details').innerHTML;
          localStorage.setItem('addedExercise', cardDetails);
  
      });
  });

  let chartData = [0, 0, 0, 0, 0, 0, 0];

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
          datasets: [{
              data: chartData,
              backgroundColor: 'rgba(40, 40, 40, 0.7)', 
              borderColor: 'rgba(128, 128, 128, 1)', 
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false, 
          scales: {
              y: {
                  beginAtZero: true,
                  max: 10,
                  ticks: {
                      color: 'white' 
                  }
              },
              x: {
                  ticks: {
                      color: 'white' 
                  }
              }
          },
          plugins: {
              legend: {
                  display: false 
              }
          }
      }
  });
  

  function addTraining() {
      const dayIndex = document.getElementById('daySelect').value;
      if (dayIndex >= 0 && dayIndex < chartData.length) {
          if (chartData[dayIndex] < 10) {
              chartData[dayIndex]++; 
              myChart.update(); 
          }
      }
  }

  function removeTraining() {
      const dayIndex = document.getElementById('daySelect').value; 
      if (dayIndex >= 0 && dayIndex < chartData.length && chartData[dayIndex] > 0) {
          chartData[dayIndex]--; 
          myChart.update(); 
      }
  }
    
