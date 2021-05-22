import { lazy, Suspense, onMount, createSignal, useContext } from "solid-js";
import LoaderLogo from "../../components/Loader/LoaderLogo";
import { GlobalContext } from "../../context/context";
import { WakaData, WakaSchema } from "../../ts";

const FusionTimeChart = lazy(() => {
  return import("./FusionTimeChart");
});

const Graph = () => {
  const [context] = useContext(GlobalContext);
  const [hasObserved, setHasObserved] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const fetchedResult = {
    res: null as any,
  };
  let sectionRef!: HTMLElement;

  onMount(() => {
    const observerCb: IntersectionObserverCallback = (entries, observer) => {
      if (context.blog.active) return;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (hasObserved()) return;
        setLoading(true);

        const run = async () => {
          fetchedResult.res = await onFetchData();
          setHasObserved(true);
        };
        run();
      });
    };

    const observer = new IntersectionObserver(observerCb);

    observer.observe(sectionRef.querySelector(".section-title")!);

    // wake up sleepy heroku
    fetch(
      // process.env.REACT_APP_WAKATIME_URL ||
      "https://my-wakatime-dashboard-2.herokuapp.com/wakeup",
      {
        headers: {
          "auth-wakatime-data":
            // process.env.REACT_APP_WAKATIME_HEADERS ||
            "my-wakatime-data-0138-cad5-40c-03-feea3714",
        },
      }
    );
  });

  return (
    <section
      ref={sectionRef}
      id="recent-coding-activity"
      className="coding-activity"
    >
      <h2 className="section-title coding-activity-title">
        Recent Coding Activity
      </h2>
      <p class="wakatime">(Powered by wakatime.com)</p>
      <div role="presentation" className="container">
        {loading() && (
          <div class="graph-loader">
            <div>Fetching graph data ...</div>
            <LoaderLogo></LoaderLogo>
          </div>
        )}
        {hasObserved() ? (
          <Suspense fallback={<div></div>}>
            <FusionTimeChart
              fetchResult={fetchedResult}
              setLoading={setLoading}
            />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
};

const onFetchData = async () => {
  const res = await fetch(
    // process.env.REACT_APP_WAKATIME_URL ||
    "https://my-wakatime-dashboard-2.herokuapp.com/",
    {
      headers: {
        "auth-wakatime-data":
          // process.env.REACT_APP_WAKATIME_HEADERS ||
          "my-wakatime-data-0138-cad5-40c-03-feea3714",
      },
    }
  );
  return (await res.json()) as [WakaData[], WakaSchema];
};

export default Graph;
