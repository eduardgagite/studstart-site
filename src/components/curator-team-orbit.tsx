import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

type CuratorTeamOrbitProps = {
  curatorName: string;
  curatorPhoto?: string | null;
  members: string[];
  memberPhotoFallback?: string;
  memberPhotosByFullName?: Partial<Record<string, string>>;
  className?: string;
};

type OrbitMember = {
  id: string;
  fullName: string;
  shortName: string;
  photo: string;
};

type OrbitStyle = CSSProperties & Record<`--${string}`, string>;

const getShortName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return fullName;
  return parts[1] ?? parts[0];
};

export function CuratorTeamOrbit({
  curatorName,
  curatorPhoto,
  members,
  memberPhotoFallback = "/images/organizers/prof/eduard-gagite.jpg",
  memberPhotosByFullName = {},
  className,
}: CuratorTeamOrbitProps) {
  const orbitMembers: OrbitMember[] = members.map((fullName, index) => ({
    id: `${fullName}-${index}`,
    fullName,
    shortName: getShortName(fullName),
    photo: memberPhotosByFullName[fullName] ?? memberPhotoFallback,
  }));

  const innerCount = orbitMembers.length > 7 ? Math.ceil(orbitMembers.length / 2) : orbitMembers.length;
  const innerMembers = orbitMembers.slice(0, innerCount);
  const outerMembers = orbitMembers.slice(innerCount);

  const orbitVars: OrbitStyle = outerMembers.length
    ? {
        "--orbit-inner-mobile": "90px",
        "--orbit-inner-desktop": "116px",
        "--orbit-outer-mobile": "132px",
        "--orbit-outer-desktop": "164px",
      }
    : {
        "--orbit-inner-mobile": "116px",
        "--orbit-inner-desktop": "146px",
        "--orbit-outer-mobile": "132px",
        "--orbit-outer-desktop": "164px",
      };

  return (
    <div className={cn("memory-curator-orbit", className)}>
      <div
        className="memory-curator-orbit-stage [--orbit-inner:var(--orbit-inner-mobile)] [--orbit-outer:var(--orbit-outer-mobile)] sm:[--orbit-inner:var(--orbit-inner-desktop)] sm:[--orbit-outer:var(--orbit-outer-desktop)]"
        style={orbitVars}
      >
        <div className="memory-curator-orbit-ring memory-curator-orbit-ring-inner" aria-hidden />
        {outerMembers.length > 0 && (
          <div className="memory-curator-orbit-ring memory-curator-orbit-ring-outer" aria-hidden />
        )}

        <div className="memory-curator-orbit-layer memory-curator-orbit-layer-inner">
          {innerMembers.map((member, index) => {
            const angle = (index / innerMembers.length) * 360 - 90;
            return (
              <div
                key={member.id}
                className="memory-curator-orbit-node"
                style={
                  {
                    "--member-angle": `${angle}deg`,
                    "--member-radius": "var(--orbit-inner)",
                  } as OrbitStyle
                }
              >
                <div className="memory-curator-orbit-node-counter memory-curator-orbit-node-counter-inner">
                  <span
                    className="memory-curator-orbit-node-content memory-curator-orbit-node-content-inner"
                    title={member.fullName}
                  >
                    <Image
                      src={assetPath(member.photo)}
                      alt={member.shortName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <span className="memory-curator-orbit-node-label">{member.shortName}</span>
                </div>
              </div>
            );
          })}
        </div>

        {outerMembers.length > 0 && (
          <div className="memory-curator-orbit-layer memory-curator-orbit-layer-outer">
            {outerMembers.map((member, index) => {
              const angle = (index / outerMembers.length) * 360 - 90;
              return (
                <div
                  key={member.id}
                  className="memory-curator-orbit-node"
                  style={
                    {
                      "--member-angle": `${angle}deg`,
                      "--member-radius": "var(--orbit-outer)",
                    } as OrbitStyle
                  }
                >
                  <div className="memory-curator-orbit-node-counter memory-curator-orbit-node-counter-outer">
                    <span
                      className="memory-curator-orbit-node-content memory-curator-orbit-node-content-outer"
                      title={member.fullName}
                    >
                      <Image
                        src={assetPath(member.photo)}
                        alt={member.shortName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="memory-curator-orbit-node-label">{member.shortName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="memory-curator-orbit-core">
          <div className="memory-curator-orbit-core-photo">
            {curatorPhoto ? (
              <Image
                src={assetPath(curatorPhoto)}
                alt={curatorName}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="memory-curator-orbit-core-photo-fallback" />
            )}
          </div>
          <p className="memory-curator-orbit-core-kicker">Куратор</p>
          <h4 className="memory-curator-orbit-core-name">{curatorName}</h4>
        </div>
      </div>
    </div>
  );
}
