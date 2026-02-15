import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results implements OnInit {
  resultData: any;
  leaderboard: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService
  ) {}

  ngOnInit() {

    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      
      // 1. Fetch the specific result for "Your Score"
      // This ensures the page shows the score for the quiz just completed
      this.quizService.getResultById(id).subscribe({
        next: (data: any) => {
          this.resultData = data;
        },
        error: (err: any) => console.error('Error fetching individual result', err)
      });

      // 2. Fetch the full leaderboard
      // This populates the global rankings table
      this.quizService.getLeaderboard().subscribe({
        next: (data: any[]) => {
          this.leaderboard = data;
        },
        error: (err: any) => console.error('Error fetching leaderboard', err)
      });
    }
  }
}