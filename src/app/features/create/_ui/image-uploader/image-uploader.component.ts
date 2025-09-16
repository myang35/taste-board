import {
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CreateForm } from '@features/create/_utils/create-form/create-form';

@Component({
  selector: 'app-image-uploader',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  readonly form = input.required<CreateForm>();

  private readonly imageInputChild =
    viewChild.required<ElementRef<HTMLInputElement>>('imageInput');

  protected imageFile = signal<File | null>(null);
  protected imageUrl = computed(() => {
    const imageFile = this.imageFile();
    return imageFile && URL.createObjectURL(imageFile);
  });

  updateImage() {
    const inputFile =
      this.imageInputChild().nativeElement.files?.item(0) || null;
    this.imageFile.set(inputFile);
  }

  sizeToString(size: number) {
    if (size < 1000000) {
      return `${(size / 1000).toFixed(1)}KB`;
    }

    if (size < 1000000000) {
      return `${(size / 1000000).toFixed(1)}MB`;
    }

    return `${(size / 1000000000).toFixed(1)}GB`;
  }
}
