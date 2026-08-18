export type LocationBand = "1-9" | "10-24" | "25-99" | "100+";
export type RegionBand = "us" | "latam" | "caribbean" | "multi";
export type PosBand = "one" | "two" | "three_plus";
export type KdsBand = "standard" | "mixed" | "none";
export type DeliveryBand = "central" | "store" | "none";
export type PaymentsBand = "standard" | "mixed" | "unknown";
export type MaturityBand = "optimized" | "scaling" | "fragmented";

export interface AssessmentAnswers {
  locations: LocationBand;
  region: RegionBand;
  pos: PosBand;
  kds: KdsBand;
  delivery: DeliveryBand;
  payments: PaymentsBand;
}

export interface AssessmentScore {
  score: number;
  band: MaturityBand;
  isMultiUnit: boolean;
  breakdown: {
    locations: number;
    pos: number;
    kds: number;
    delivery: number;
    payments: number;
  };
}

const LOCATION_POINTS: Record<LocationBand, number> = {
  "1-9": 6,
  "10-24": 11,
  "25-99": 13,
  "100+": 15,
};

const POS_POINTS: Record<PosBand, number> = {
  one: 25,
  two: 14,
  three_plus: 6,
};

const KDS_POINTS: Record<KdsBand, number> = {
  standard: 20,
  mixed: 10,
  none: 5,
};

const DELIVERY_POINTS: Record<DeliveryBand, number> = {
  central: 20,
  store: 10,
  none: 4,
};

const PAYMENTS_POINTS: Record<PaymentsBand, number> = {
  standard: 20,
  mixed: 9,
  unknown: 4,
};

export function scoreAssessment(answers: AssessmentAnswers): AssessmentScore {
  const breakdown = {
    locations: LOCATION_POINTS[answers.locations],
    pos: POS_POINTS[answers.pos],
    kds: KDS_POINTS[answers.kds],
    delivery: DELIVERY_POINTS[answers.delivery],
    payments: PAYMENTS_POINTS[answers.payments],
  };

  const score = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  let band: MaturityBand = "fragmented";
  if (score >= 80) {
    band = "optimized";
  } else if (score >= 55) {
    band = "scaling";
  }

  return {
    score,
    band,
    isMultiUnit: answers.locations !== "1-9",
    breakdown,
  };
}

export function locationCountForCrm(locations: LocationBand): number {
  switch (locations) {
    case "1-9":
      return 5;
    case "10-24":
      return 15;
    case "25-99":
      return 40;
    case "100+":
      return 100;
  }
}
