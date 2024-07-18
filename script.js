// TWEEZERS vs LUMEN
/*

variables:
- operator hourly rate - 20 (ziprecruiter link)
- time to hand-assemble one board - 20min
- time to set up - 2 hours
- parts per board - 29
- boards per job - 4

assumptions:
- takes 2.5 minutes to flip a job
- cph 800

*/

//joint data
/*
variables:
- parts per board


assumptions (could be editable under dropdown):
- takes 2 minutes to flip a job
- cph 800
- hand assembly time per part assumption
- boards per job (just assume four, customer wont necessarily know what they could fit)
- outsourced cost per smt part
*/


document.getElementById("toggle").addEventListener("click", toggle, false);

document.getElementById("calculate-button").addEventListener("click", calculate, false);

document.getElementById("calculate-button-outsource").addEventListener("click", calculate_outsource, false);

var activeChart;
var boardsChart;
var outsourcedChart;
var handActive = false;

function calculate_outsource(){

  if (typeof outsourcedChart !== 'undefined') {
    outsourcedChart.destroy();
  }
  var numOfBoards = document.getElementById("num-of-boards-outsourcing").value;
  var partsPerBoard = document.getElementById("parts-per-board-outsourcing").value;

  let out = 9+((numOfBoards-100)/250);

  let lumenwork = (3/24)+(numOfBoards*partsPerBoard/800/24)

  console.log(lumenwork)

  let lumen = Math.floor(lumenwork/(.33))*0.66 + lumenwork; 

  console.log(lumen)


  var timelines = [out, lumen];

  var ctx = document.getElementById("outsource-graph");
  const labels = ["Outsourced", "LumenPnP"]
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Days',
        data: timelines,
      }
    ]
  };

  outsourcedChart = new Chart(ctx, {
    type: 'bar',
    data: data,  
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
            display: true,
            text: 'Time to Produce',
            padding: {
                top: 30,
                bottom: 10
            },
            font: {
              size: 20
            }
        },
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: true,
      animations: false,
      aspectRatio: 2,
      scales: {
        y: {
          
          display: true,
          
        },
        x: {
          title: {
            display: true,
            text: "Days"
          }
        }
      }
    }
  });


}

function toggle(){
  if(handActive){
    //hide hand, show outsource
    document.getElementById("hand").style.display = "none";
    document.getElementById("outsource").style.display = "block";
    //change copy in toggle
    document.getElementById("toggle").innerHTML = "Compare Against Hand Placing Instead";

    handActive = false;
  }
  else{
    //hide outsource, show hand
    document.getElementById("outsource").style.display = "none";
    document.getElementById("hand").style.display = "block";
    //change copy in toggle
    document.getElementById("toggle").innerHTML = "Compare Against Outsourcing Instead";

    handActive = true;

  }
}

document.getElementById("graph-type").onclick = function() {
  if (this.checked) {
    document.getElementById("cost-graph").style.display = "block";
    document.getElementById("time-graph").style.display = "none";
      
  }
  else {
    document.getElementById("cost-graph").style.display = "none";
    document.getElementById("time-graph").style.display = "block";
  }
};

function destroy(lumenChart, boardsChart){
    if (typeof lumenChart !== 'undefined') {
        lumenChart.destroy();
    }
    if (typeof boardsChart !== 'undefined') {
        boardsChart.destroy();
    }
}

function calculateHandCost(x, operator_rate, time_to_hand_assemble_board) {
    var hand_option_cost = time_to_hand_assemble_board * operator_rate * x;
    return hand_option_cost;
}

function calculateLumenCost(x, operator_rate, boards_per_job) {
    var lumenpnp_cost = 1995;                   //in usd
    var lumenpnp_setup_time = 3;                //in hours
    var human_time_per_lumenpnp_board = (2.5/60) / boards_per_job;   //in hours

    var pnp_option_cost = lumenpnp_cost + (lumenpnp_setup_time * operator_rate) + (human_time_per_lumenpnp_board * operator_rate * x);
    return pnp_option_cost;

}

function calculateHandBoards(h, time_to_hand_assemble_board){
    return h / time_to_hand_assemble_board;
}

function calculateLumenBoards(h, chips_per_board, boards_per_job){
  if(h<4){
    return 0;
  }
  else{
    let hoursOfProduction = h - 3;

    let humanTimePerBoard =  (2.5/60) / boards_per_job;
    let lumenTimePerBoard = (chips_per_board / 800);
    let timePerBoard = humanTimePerBoard + lumenTimePerBoard;

    return hoursOfProduction / timePerBoard;
  }
}


function calculate(){

    destroy(activeChart, boardsChart);

//--------------------
// USER INPUT

    var operator_rate = document.getElementById("operator-rate").value;
    var time_to_hand_assemble_board = document.getElementById("hand-time").value / 60;
    var chips_per_board = document.getElementById("parts-per-board").value;
    let boards_per_job = document.getElementById("boards-per-job").value;

//--------------------
// COST CALCULATION

    var lumen_data = [];
    var hand_data = [];
    var x_axis = [];

    var index = 1;
    var cost_flipped = false;
    var cost_flipped_point = 0;

    while(!cost_flipped){

        hand_data[index - 1] = calculateHandCost(index, operator_rate, time_to_hand_assemble_board);
        lumen_data[index - 1] = calculateLumenCost(index, operator_rate, boards_per_job);

        x_axis[index - 1] = index;

        if(hand_data[index - 1] > lumen_data[index - 1]){
            cost_flipped = true;
            cost_flipped_point = index;
        }

        index = index + 1;

        if(index > 5000){
            break;
        }
    }

    while(index < cost_flipped_point*5){
        hand_data[index - 1] = calculateHandCost(index, operator_rate, time_to_hand_assemble_board);
        lumen_data[index - 1] = calculateLumenCost(index, operator_rate, boards_per_job);
        x_axis[index - 1] = index;

        index = index + 1;

        if(index > 5000){
            break;
        }

    }

    console.log("final hand data: " + hand_data);
    console.log("final lumen data: " + lumen_data);

    const ctx = document.getElementById('myChart');

    activeChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: x_axis,
          datasets: [{
            label: 'Hand Population',
            data: hand_data,
            borderWidth: 1
          },
          {
            label: 'LumenPnP Population',
            data: lumen_data,
            borderWidth: 1
          }
        
          ]
        },  
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y) + " spent to produce " + (context.parsed.x + 1) + " boards.";
                    }
                    return label;
                },
                title: function(context) {
                  return "";
                }
              
              }


            },
            title: {
                display: true,
                text: 'Cost per Board Produced',
                padding: {
                    top: 30,
                    bottom: 10
                },
                font: {
                  size: 20
                }
            }
          },
          maintainAspectRatio: true,
          animations: false,
          aspectRatio: 2,
          scales: {
            y: {
              title: {
                display: true,
                text: "Total Cost"
              },
              display: true,
              beginAtZero: true,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
              }
            },
            x: {
              title: {
                display: true,
                text: "Boards Produced"
              }
            }
          }
        }

            
        
    });
    // end chart

    // add flip point below

    document.getElementById("order").innerHTML = "<p>A LumenPnP pays for itself after</p><div class='flipped-point'>" + cost_flipped_point + "</div><p>boards produced.</p><br><h2>Questions?</h2><h3>Ask us at <a href='mailto:sales@opulo.io'>sales@opulo.io</a>.</h3> ";
    document.getElementById("order").style.display = "inline-block";

//--------------------
// TIME CALCULATION

    var lumen_boards = [];
    var hand_boards = [];
    var x_axis_boards = [];

    var index = 1;

    while(index < 41){

      //calculate how many boards would be made at this hour
      hand_boards[index - 1] = calculateHandBoards(index, time_to_hand_assemble_board);
      
      //calculate how many board would be made on the lumen at this hour
      lumen_boards[index - 1] = calculateLumenBoards(index, chips_per_board, boards_per_job);

      //add x axis
      x_axis_boards[index - 1] = index;

      index = index + 1;

    }

    console.log("final hand boards: " + hand_boards);
    console.log("final lumen boards: " + lumen_boards);

    const boards_chart = document.getElementById('boardsChart');

    boardsChart = new Chart(boards_chart, {
        type: 'line',
        data: {
          labels: x_axis_boards,
          datasets: [{
            label: 'Hand Population',
            data: hand_boards,
            borderWidth: 1
          },
          {
            label: 'LumenPnP Population',
            data: lumen_boards,
            borderWidth: 1
          }
        
          ]
        },  
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(2) + " boards produced after " + (context.parsed.x + 1) + " hours";
                    }
                    return label;
                },
                title: function(context) {
                  return "";
              }
              
              }
            },
            title: {
                display: true,
                text: 'Boards Produced per Hour',
                padding: {
                    top: 30,
                    bottom: 10
                },
                font: {
                  size: 20
                }
            }
          },
          maintainAspectRatio: true,
          animations: false,
          aspectRatio: 2,
          scales: {
            y: {
              title: {
                display: true,
                text: "Boards Produced"
              },
              display: true,
              beginAtZero: true
            },
            x: {
              title: {
                display: true,
                text: "Hours"
              }
            }
          },
            tooltips: {
                callbacks: {
                label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                }
                }
            }
        }

            
        
    });

    // conclusion data
    var speed_factor = (lumen_boards[39]-lumen_boards[38]) / (hand_boards[39]-hand_boards[38]);

    document.getElementById("bph-result").innerHTML = "<p>A LumenPnP assembles boards</p><div class='flipped-point'>" + speed_factor.toFixed(1) + "x</div><p>faster than hand-placing after setup.</p><br><h2>Questions?</h2><h3>Ask us at <a href='mailto:sales@opulo.io'>sales@opulo.io</a>.</h3> ";
    document.getElementById("bph-result").style.display = "inline-block";

    if (document.getElementById("graph-type").checked){
      document.getElementById("cost-graph").style.display = "block";
      document.getElementById("time-graph").style.display = "none";
    }
    else {
      document.getElementById("cost-graph").style.display = "none";
      document.getElementById("time-graph").style.display = "block";
    }

}


