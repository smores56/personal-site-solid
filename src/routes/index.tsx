import { A, Title } from "solid-start";
import ExternalLink from "~/components/ExternalLink";
import { EMAIL } from "~/data";

export default function Home() {
  return (
    <main>
      <Title>Sam Mohr</Title>

      <div
        class="hero fixed top-2/4 left-2/4"
        style={{
          transform: "translate(-50%, -50%)"
        }}
      >
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hi, I'm Sam Mohr</h1>
            <p class="py-6">
              I'm a software developer that likes doing things
              right the first time. I also
              <A class="text-info" href="/keyboards"> design keyboards</A>
              , sing, and watch too many movies when I'm free.
            </p>

            <div class="btn-group btn-group-vertical">
              <ExternalLink
                class="btn btn-primary"
                href="https://linkedin.com/in/samuel-mohr"
              >
                Check out my LinkedIn
              </ExternalLink>
              <ExternalLink
                class="btn btn-success"
                href="https://github.com/smores56"
              >
                View my GitHub profile
              </ExternalLink>
              <ExternalLink
                class="btn btn-warning"
                href={`mailto:${EMAIL}`}
              >
                Email me at {EMAIL}
              </ExternalLink>
              <ExternalLink
                href="https://resume.sammohr.dev"
                class="btn btn-error"
              >
                Download my resume
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
