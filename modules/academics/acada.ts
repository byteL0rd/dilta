import { ScoreSheet } from './score-sheet';
import { RecordOperations } from './subject-records';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';
import { ClassStaticsDetails } from './class-statics-details';

@Module({
  imports: [DatabaseModule],
  providers: [RecordOperations, ScoreSheet, ClassStaticsDetails]
})
@Injectable()
export class AcademicModules {
  constructor() {}
}