import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
class IntensityZone {
  @Prop({ default: null })
  totalTime: number;

  @Prop({ default: null })
  lowerLimit: number;
}

@Schema()
export class HrIntensity {
  @Prop({ type: IntensityZone })
  zone1: IntensityZone;

  @Prop({ type: IntensityZone })
  zone2: IntensityZone;

  @Prop({ type: IntensityZone })
  zone3: IntensityZone;

  @Prop({ type: IntensityZone })
  zone4: IntensityZone;

  @Prop({ type: IntensityZone })
  zone5: IntensityZone;
}
