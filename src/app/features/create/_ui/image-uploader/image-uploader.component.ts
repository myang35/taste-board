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
import { ImageComponent } from '@shared/ui/image/image.component';

@Component({
  selector: 'app-image-uploader',
  imports: [MatIcon, ReactiveFormsModule, ImageComponent],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  readonly form = input.required<CreateForm>();
  readonly initialSrc = input<string>();

  private readonly imageInputChild =
    viewChild.required<ElementRef<HTMLInputElement>>('imageInput');

  protected imageFile = signal<File | null | undefined>(undefined);
  protected imageUrl = computed(() => {
    const imageFile = this.imageFile();
    const initialSrc = this.initialSrc();
    if (imageFile === undefined) {
      return initialSrc;
    }
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return '';
  });

  updateImage() {
    this.imageFile.set(
      this.imageInputChild().nativeElement.files?.item(0) || null,
    );
    this.form().image.setValue(this.imageFile());
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
