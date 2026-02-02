import { HomeView } from "./view";

export default function Home() {
  const hostname = process.env.HOST_MACHINE_NAME ?? "unknown";
  return <HomeView hostname={hostname} />;
}
