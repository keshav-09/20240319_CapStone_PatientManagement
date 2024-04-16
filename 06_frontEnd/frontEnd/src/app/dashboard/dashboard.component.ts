import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  pieChart!: Chart<'pie', number[], string>;
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.setupPieChart();
  }

  async setupPieChart() {
    try {
      const data = await this.fetchData();
      if (data && data.length > 0) {
        const labels = data.map((item: any) => item._id); // Use '_id' for labels
        const chartData = data.map((item: any) => item.count);
        const backgroundColors = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ].slice(0, data.length); // Ensure there are enough colors for each data point

        const ctx = document.getElementById('myPieChart');
        if (ctx instanceof HTMLCanvasElement) {
          this.renderPieChart(ctx, labels, chartData, backgroundColors);
        } else {
          console.error('Could not find canvas element with ID "myPieChart"');
        }
      } else {
        console.error('No data received from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async fetchData() {
    try {
      const response = await this.http
        .get<any[]>(`http://localhost:3000/doctor/doctor/getAllDisease`, { params: { startDate: this.startDate, endDate: this.endDate } })
        .toPromise();
      return response || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  renderPieChart(ctx: HTMLCanvasElement, labels: string[], chartData: number[], backgroundColors: string[]) {
    if (this.pieChart) {
      // Destroy the existing chart
      this.pieChart.destroy();
    }
    
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: chartData,
            backgroundColor: backgroundColors,
            hoverOffset: 4
          }
        ]
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Common Disease in Particular time stamp'
            },
            legend: {
                position: 'right'
            }
        }
    }
    
    });
  }

  onSubmit() {
    this.setupPieChart();
  }
  isValidForm(): boolean {
    return !!this.startDate && !!this.endDate;// Check if both start and end dates are entered
}
}