import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  image: string;
}
