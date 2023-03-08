<template>
<div>
  <h1 class="view-title">Dashboard</h1>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row"><div class="col-lg-3 col-md-6 col-12">
          <div class="mb-4 card"><div class="p-3 card-body">
            <div class="d-flex flex-row-reverse justify-content-between">
              <div>
                <div class="text-center icon icon-shape bg-gradient-primary border-radius-2xl">
                  <i class="text-lg opacity-10 ni ni-money-coins" aria-hidden="true"></i>
                </div>
              </div>
              <div class=""><div class="numbers">
                <p class="mb-0 text-sm text-uppercase font-weight-bold">Today's Money</p>
                <h5 class="font-weight-bolder">$53,000</h5>
                <span class="text-sm text-success">+55%</span>
                since yesterday
              </div>
              </div>
            </div>
          </div>
          </div>
        </div>
          <div class="col-lg-3 col-md-6 col-12">
            <div class="mb-4 card">
              <div class="p-3 card-body">
                <div class="d-flex flex-row-reverse justify-content-between">
                  <div>
                    <div class="text-center icon icon-shape bg-gradient-danger border-radius-2xl">
                      <i class="text-lg opacity-10 ni ni-world" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div class="">
                    <div class="numbers">
                      <p class="mb-0 text-sm text-uppercase font-weight-bold">Today's Users</p>
                      <h5 class="font-weight-bolder">2,300</h5><span class="text-sm text-success">+3%</span>
                      since last week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 mb-lg">
              <div class="card z-index-2">
                <div class="card">
                  <div class="pb-0 card-header mb-0">
                    <h6>Something overview</h6>
                    <p class="text-sm">
                      <i class="fa fa-arrow-up text-success" aria-hidden="true"></i>
                      <span class="font-weight-bold">4% more</span>
                      in 2021
                    </p>
                  </div>
                  <div class="p-3 card-body">
                    <div class="chart">
                      <canvas id="chart-line" class="chart-canvas"
                              height="375" style="display: block;
                              box-sizing: border-box; height: 300px; width: 803px;" width="1004"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="card card-carousel overflow-hidden h-100 p-0">
                <div id="carouselExampleCaptions" class="carousel slide h-100" data-bs-ride="carousel">
                  <div class="carousel-inner border-radius-lg h-100">
                    <div class="carousel-item h-100 active"
                         style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-camera-compact text-dark opacity-10"></i>
                        </div><h5 class="text-white mb-1">Get started with Argon</h5>
                        <p>There’s nothing I really wanted to do in life that I wasn’t able to get good at.</p>
                      </div>
                    </div>
                    <div class="carousel-item h-100" style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-bulb-61 text-dark opacity-10"></i>
                        </div>
                        <h5 class="text-white mb-1">Faster way to create web pages</h5>
                        <p>That’s my skill. I’m not really specifically talented at anything except for the ability to learn.</p>
                      </div>
                    </div>
                    <div class="carousel-item h-100" style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-trophy text-dark opacity-10"></i>
                        </div>
                        <h5 class="text-white mb-1">Share with us your design tips!</h5>
                        <p>Don’t be afraid to be wrong because you can’t learn anything from a compliment.</p>
                      </div>
                    </div>
                  </div>
                  <button class="carousel-control-prev w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button><button class="carousel-control-next w-5 me-3"
                                   type="button" data-bs-target="#carouselExampleCaptions"
                                   data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-7 mb-lg-0 mb-4">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2">Job Records</h6>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center">
                    <tbody>
                      <tr>
                        <td class="w-30">
                          <div class="px-2 py-1 d-flex align-items-center">
                            <div>
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAARCAYAAAA2cze9AAAAAXNSR0IArs4c6QAABD9JREFUOBGVlMluG0cQhv9eZiM54ipRqy2LsWzIC5IIQWDAh1yCPIF9CZBLAD+HrkHexH4JX3MJjCSSYctgFmuLKHLI2Zee6dTIQHLIyQUUZzjT83f1V383w0fGwcGB+Xg8dnM/65ipapYVHEBbWVEwrSiKKilN08PQ/ovRC/b4ux+27uy45tYyLvaWl5MnT59WL54/50eeZ2VTo6n6q0sbvx/1Ho1fbbDe8l2j1dwRjrOtwddLXfUKVbTTNBV5XqScsYkoyndp6X/LsP/M2Ow1fhyNRt90ltxTKdiVIXgKyW0w2ZOm5U5z0d6X0eDZStZxG01DVFRSkqAIQsQLH5HnIQxD5LqE1e7AWV3BZZZvSaQeC0PuTmN2N+HiriEBITiEYYFTysrAhDJOQrTiM1RhhAIasG1o2wIcG6K1DiNLUfo+dBAheXOMKgo1SVEVnOd5plBSwUIKcGlAqgqiKGAZQE5jKgKI7S3Ya0Og1ay/gopiaG+OYjYDK3KIbgf2JzuQ3S5kUuBavP4xJFVLFTPGwSkJz/X/+rlJyrK9BCYWKF79BnU5JSwplK6QcaBgDCpNkAUBFOEyGi0sePVBHKARFJwLEiDxOnmdDIyukCbK8xPo+TnkrU2Yn94H73VR0cRJmkGQqI4iiKqE6Thg9EzOgg/iBflJo173f0FUKWozaeg0BRvdgny4Bz6ZIH99DHV2jnw2R0po4jhGmMTI8xSGacMabSOVLch7JJG0DaRFiSDMYBFkJglDSWiIt8g1itYSzPEY2c+vrrmKzXXYj76A1WlfjzcrBUkTpIREUtX6/TnSyyvIJ0/uoSEbsDZu46q0cOnnKJkgMzjoLzlY6zax2rHxwFqDW30OnZNXZh7U6QWyw7eIriaIp7MPVmQVrJUhnHt30NjaJSwvXqDTG+LLB+/R3b0NLPfBnRYckcPOL2FeEMsjWv50gcBPoMkVjLiKQQ+s34G1tQZN7CtqKPcX4LMF8sM38Io5ie/tQbkDzBRH8dMvZEEFS0hkpglBHpaNJsx+D3I0gj2kiVsutYJRA2MUiwWy6RTFhDIKyMqEcrgC88Ee+op8ULdNxz7Mh5/BXh2SxyXZ0qDGmJD1PQmJXIHRTlSv36HyFkBK1ZOTSiHo8CArkCVZXkKHC6iTv1GJI3hZLX50BOzcMdSvh7ScY3ASBe08RtXrusLa85ZF3nXAXRfsxiYKAUTEfh6GOgiDLA7iLEkTrSTM5vqgMej2kPkRk2e2rXF6Pnu7znDz5g00yRkV4VC1eFmiJJGAtrV/cTKPovA0D+NxFPh/Eo4/wsn0IvC8qwgR+YyGA422cDcGO9v7RSFCWhTY98Cua/W/doeD+41Gc8O0jCZjQrGqnFZKTUjwJPXmx2FwPr4A5mfA4iUQElEi+//4CuhQ+v/unH06AQaAu0RHEdlb0sFXxXSs+AAVhfQlJV0/Kv4BBjMI848b/CoAAAAASUVORK5CYII=" alt="Country flag">
                            </div>
                            <div class="ms-4">
                              <p class="mb-0 text-xs font-weight-bold">Country:</p>
                              <h6 class="mb-0 text-sm">United States</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="text-center">
                            <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                            <h6 class="mb-0 text-sm">2500</h6>
                          </div>
                        </td>
                        <td>
                          <div class="text-center">
                            <p class="mb-0 text-xs font-weight-bold">Value:</p>
                            <h6 class="mb-0 text-sm">$230,900</h6>
                          </div>
                        </td>
                        <td class="text-sm align-middle">
                          <div class="text-center col">
                            <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                            <h6 class="mb-0 text-sm">29.9%</h6>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <h6 class="mb-2">Tags</h6>
                </div><div class="p-3 card-body">
                <ul class="list-group">
                  <li class="mb-2 border-0 list-group-item d-flex justify-content-between border-radius-lg ps-0">
                    <div class="d-flex align-items-center">
                      <div class="text-center shadow icon icon-shape icon-sm bg-gradient-dark me-3">
                        <i class="ni ni-mobile-button text-white opacity-10"></i>
                      </div><div class="d-flex flex-column">
                      <h6 class="mb-1 text-sm text-dark">Devices</h6>
                      <span class="text-xs">250 in stock,
                        <span class="font-weight-bold">346+ sold</span>
                      </span>
                    </div>
                    </div>
                    <div class="d-flex">
                      <button class="my-auto btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right">
                        <i class="ni ni-bold-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </li>
                  <li class="mb-2 border-0 list-group-item d-flex justify-content-between border-radius-lg ps-0">
                    <div class="d-flex align-items-center">
                      <div class="text-center shadow icon icon-shape icon-sm bg-gradient-dark me-3">
                        <i class="ni ni-tag text-white opacity-10"></i>
                      </div>
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-sm text-dark">Tickets</h6>
                        <span class="text-xs">123 closed,
                          <span class="font-weight-bold">15 open</span>
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <button class="my-auto btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right">
                        <i class="ni ni-bold-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </li>
                  <li class="border-0 list-group-item d-flex justify-content-between border-radius-lg ps-0">
                    <div class="d-flex align-items-center">
                      <div class="text-center shadow icon icon-shape icon-sm bg-gradient-dark me-3">
                        <i class="ni ni-box-2 text-white opacity-10"></i>
                      </div>
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-sm text-dark">Error logs</h6>
                        <span class="text-xs">1 is active,
                          <span class="font-weight-bold">40 closed</span>
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <button class="my-auto btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right">
                        <i class="ni ni-bold-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </li>
                  <li class="border-0 list-group-item d-flex justify-content-between border-radius-lg ps-0">
                    <div class="d-flex align-items-center">
                      <div class="text-center shadow icon icon-shape icon-sm bg-gradient-dark me-3">
                        <i class="ni ni-satisfied text-white opacity-10"></i>
                      </div>
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-sm text-dark">Happy Users</h6>
                        <span class="text-xs font-weight-bold">+ 430</span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <button class="my-auto btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right">
                        <i class="ni ni-bold-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  mounted() {
    const ctx = document.getElementById('chart-line').getContext('2d');
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'My Dataset',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
          lineTension: 0.4
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        elements: {
          point: {
            radius: 0, // set the radius to 0 to remove the dots
          },
        },
        plugins: {
          tooltip: {
            enabled: true, // enable the tooltip
            intersect: false, // show the tooltip for all data points that intersect with the mouse
            mode: 'nearest', // show the tooltip for the data point that is closest to the mouse
          },
          legend: {
            display: false, // set this to false to remove the legend
          },
        },
        scales: {
          // set the x-axis grid lines to be hidden
          x: {
            grid: {
              display: false,
            },
          },
          // set the y-axis grid lines to be dashed
          y: {
            grid: {
              borderDash: [2],
              borderWidth: 1,
            },
          },
        },
      },
    });
  },
  unmounted () {
    this.chart.destroy();
  }
}
</script>
