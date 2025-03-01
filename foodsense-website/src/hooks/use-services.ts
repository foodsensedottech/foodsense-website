import { useState, useEffect } from "react";
import {
  getServiceOptions,
  type ServiceOption,
} from "@/lib/constants/services";

export function useServices() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth UX
    const timer = setTimeout(() => {
      setServices(getServiceOptions());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    services,
    isLoading,
    error: null,
  };
}
