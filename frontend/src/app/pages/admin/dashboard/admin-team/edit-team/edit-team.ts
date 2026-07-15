import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TeamService } from '../../../../../services/team/team';

import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-edit-team',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './edit-team.html',

  styleUrl: './edit-team.css',
})
export class EditTeam implements OnInit {
  teamForm!: FormGroup;

  teamId = '';

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  currentImage = '';

  loading = false;

  constructor(
    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private teamService: TeamService,

    private toastr: ToastrService,

    private cd: ChangeDetectorRef,
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],

      position: ['', Validators.required],

      quote: [''],
    });
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') || '';

    this.loadTeam();
  }

  loadTeam(): void {
    this.teamService

      .getTeam(this.teamId)

      .subscribe({
        next: (team: any) => {
          this.currentImage = team.image;

          this.imagePreview = team.image;

          this.teamForm.patchValue({
            name: team.name,

            position: team.position,

            quote: team.quote,
          });

          this.cd.detectChanges();
        },

        error: (err) => {
          console.error(err);

          this.toastr.error('Failed to load team member');
        },
      });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;

      this.cd.detectChanges();
    };

    reader.readAsDataURL(this.selectedFile);
  }

  saveTeam(): void {
    if (this.teamForm.invalid) {
      this.toastr.warning('Please complete required fields');

      return;
    }

    this.loading = true;

    const updateTeam = (imageUrl: string) => {
      const teamData: Team = {
        name: this.teamForm.value.name,

        position: this.teamForm.value.position,

        quote: this.teamForm.value.quote,

        image: imageUrl,
      };

      this.teamService

        .updateTeam(
          this.teamId,

          teamData,
        )

        .subscribe({
          next: () => {
            this.loading = false;

            this.toastr.success('Team member updated successfully');

            this.router.navigate(['/dashboard/team']);
          },

          error: (err) => {
            console.error(err);

            this.loading = false;

            this.toastr.error('Failed to update team member');
          },
        });
    };

    if (this.selectedFile) {
      const formData = new FormData();

      formData.append(
        'image',

        this.selectedFile,
      );

      this.teamService

        .uploadImage(formData)

        .subscribe({
          next: (res: any) => {
            updateTeam(res.url);
          },

          error: () => {
            this.loading = false;

            this.toastr.error('Image upload failed');
          },
        });
    } else {
      updateTeam(this.currentImage);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/team']);
  }
}
