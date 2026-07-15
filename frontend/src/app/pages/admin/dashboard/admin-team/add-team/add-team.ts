import { Component, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TeamService } from '../../../../../services/team/team';

import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-add-team',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './add-team.html',

  styleUrl: './add-team.css',
})
export class AddTeam {
  teamForm!: FormGroup;

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,

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

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;

      this.cd.detectChanges();
    };

    reader.readAsDataURL(this.selectedFile);
  }

  saveTeam(): void {
    if (this.teamForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please fill all required fields and select image');

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append(
      'image',

      this.selectedFile,
    );

    this.teamService

      .uploadImage(formData)

      .subscribe({
        next: (uploadRes: any) => {
          const teamData: Team = {
            name: this.teamForm.value.name,

            position: this.teamForm.value.position,

            quote: this.teamForm.value.quote,

            image: uploadRes.url,
          };

          this.teamService

            .createTeam(teamData)

            .subscribe({
              next: () => {
                this.loading = false;

                this.toastr.success('Team member created successfully');

                this.router.navigate(['/dashboard/team']);
              },

              error: () => {
                this.loading = false;

                this.toastr.error('Failed to create team member');
              },
            });
        },

        error: () => {
          this.loading = false;

          this.toastr.error('Image upload failed');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/team']);
  }
}
