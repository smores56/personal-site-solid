import { For } from "solid-js";
import { Title } from "solid-start";

import KeyboardCard from "~/components/keyboards/KeyboardCard";
import { ALL_KEYBOARDS, CLOG_V2_README_URL, DISCORD_NAME, EMAIL } from "~/data";

import EmailIcon from "~/components/icons/EmailIcon";
import ExternalLink from "~/components/ExternalLink";
import discordIconUrl from "~/images/discord-icon.svg";
import smoresBoardsUrl from "~/images/smoresboards.png";

export default function Home() {
  const gimmeBoardHeroId = "gimme-a-board-hero";

  function scrollToGimmeBoardHero() {
    const heroElement = document.getElementById(gimmeBoardHeroId);
    heroElement?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <Title>S'mores Boards</Title>
      <div class="hero mb-8">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <img src={smoresBoardsUrl} />
            <p class="py-6">
              At first I designed keyboards out of need to manage
              my flaring RSI. But I could have stopped a year ago...
            </p>
            <button
              class="btn btn-primary"
              onclick={scrollToGimmeBoardHero}
            >
              How Can I Get One?
            </button>
          </div>
        </div>
      </div>

      <div class="grid bg-primary">
        <div class="container mx-auto my-8">
          <For each={ALL_KEYBOARDS}>
            {(keyboard) => (
              <KeyboardCard keyboard={keyboard} />
            )}
          </For>
        </div>
      </div>

      <div class="hero my-8" id={gimmeBoardHeroId}>
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Gimme A Board</h1>
            <p class="py-6">
              I build boards of all shapes and sizes, even stuff
              I didn't design. If you want me to build you a board,
              or just need some advice on where to start, contact me:
            </p>

            <div class="btn-group">
              <ExternalLink class="btn btn-primary" href="https://discord.com/users/139936115393036289">
                <span class="mr-2 normal-case">{DISCORD_NAME}</span>
                <img width="16" src={discordIconUrl} />
              </ExternalLink>
              <ExternalLink class="btn btn-secondary" href={`mailto:${EMAIL}`}>
                <span class="mr-2 normal-case"> {EMAIL}</span>
                <EmailIcon />
              </ExternalLink>
            </div>

            <p class="py-6">
              However, all of these boards are open source and MIT licensed!
              You can just do it yourself, and I won't mind you doing the
              hard work for me. The
              <ExternalLink class="text-info" href={CLOG_V2_README_URL}> Clog V2 README </ExternalLink>
              has instructions on how you can order a board yourself.
            </p>
          </div>
        </div>
      </div>
    </main >
  );
}
