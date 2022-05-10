import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
class IntensityZone {
  @Prop({ required: true })
  totalTime: number;

  @Prop({ required: true })
  lowerLimit: number;
}

@Schema()
export class HrIntensity {
  @Prop({ required: true, type: IntensityZone })
  zone1: IntensityZone;

  @Prop({ required: true, type: IntensityZone })
  zone2: IntensityZone;

  @Prop({ required: true, type: IntensityZone })
  zone3: IntensityZone;

  @Prop({ required: true, type: IntensityZone })
  zone4: IntensityZone;

  @Prop({ required: true, type: IntensityZone })
  zone5: IntensityZone;
}
