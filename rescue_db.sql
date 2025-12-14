--
-- PostgreSQL database dump
--

\restrict ygrsg6U6bfb4WmgqS479WGjMpxNV3dJMRQhbfOyuFN48rDEp5kOSZFX6sE1cgIL

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: Epoch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Epoch" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "order" integer NOT NULL,
    title text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Epoch" OWNER TO postgres;

--
-- Name: Experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Experience" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "order" integer NOT NULL,
    "epochId" text NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    description text NOT NULL,
    "basicAnalysis" text NOT NULL,
    "extendedAnalysisId" text
);


ALTER TABLE public."Experience" OWNER TO postgres;

--
-- Name: ExtendedAnalysis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExtendedAnalysis" (
    "userId" text NOT NULL,
    selected boolean NOT NULL,
    "experienceId" text NOT NULL,
    "eventAnalysis" text NOT NULL,
    "effectAnalysis" text NOT NULL
);


ALTER TABLE public."ExtendedAnalysis" OWNER TO postgres;

--
-- Name: FutureAuthoring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FutureAuthoring" (
    "userId" text NOT NULL,
    "oneThingYouCouldDoBetter" text NOT NULL,
    "thingsToLearnAbout" text NOT NULL,
    "improveYourHabits" text NOT NULL,
    "socialLife" text NOT NULL,
    "leisureLife" text NOT NULL,
    "familyLife" text NOT NULL,
    "careerLife" text NOT NULL,
    "qualitiesYouAdmire" text NOT NULL,
    "idealFuture" text NOT NULL,
    "worstFuture" text NOT NULL
);


ALTER TABLE public."FutureAuthoring" OWNER TO postgres;

--
-- Name: Goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Goal" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "isMain" boolean NOT NULL,
    priority integer NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    description text NOT NULL,
    "motiveAnalysis" text NOT NULL,
    "impactAnalysis" text NOT NULL,
    "strategicAnalysis" text NOT NULL,
    "obstacleAnalysis" text NOT NULL,
    "progressAnalysis" text NOT NULL
);


ALTER TABLE public."Goal" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    password text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    role text DEFAULT 'user'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Epoch; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Epoch" (id, "userId", "order", title) VALUES ('cm1kvre460000pof5femyd3s4', 'cm1a23by40000i1juexnpwsl8', 1, 'GA with Cassi');
INSERT INTO public."Epoch" (id, "userId", "order", title) VALUES ('cm1kvre470001pof5zv6887qk', 'cm1a23by40000i1juexnpwsl8', 2, 'Austin to Florida');


--
-- Data for Name: Experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Experience" (id, "userId", "order", "epochId", title, description, "basicAnalysis", "extendedAnalysisId") VALUES ('cmajrrma70003w0g5zzpo3a9i', 'cm1a23by40000i1juexnpwsl8', 2, 'cm1kvre470001pof5zv6887qk', 'My Decision to Go to Austin Instead of Dallas', 'When I first went to Dallas, not yet fully understanding that no such jobs awaited me, I came to some under-construction, supposedly rat infested area, and seeing the monthly rent was at a loss for how I could possibly survive it. I think I had lined up the move with my lease ending in Georgia. I had prepared, but not gotten a job there first. I got cold feet and ended up going to Paul''s to stay for a few days. Somehow along the way in my deep uncertainty they offered that their relative sell Austin to me instead, as she was some tech recruiter or some shit. A dumb witch she turned out to be- carelessly feigning interest in providing me a kind of support into a job. I fell for this, and switched to Austin, telling myself there would be more jobs in tech there. So, originally I actually wasn''t an Austin bandwagon nerd, I was interested in the Big Dallas, having mistaken my memories of Houston, for it.', 'Austin was neat, Dallas better than I thought. But neither of these places was what I had wanted. 
', NULL);
INSERT INTO public."Experience" (id, "userId", "order", "epochId", title, description, "basicAnalysis", "extendedAnalysisId") VALUES ('cm1kvri6n0008pof5il783r2w', 'cm1a23by40000i1juexnpwsl8', 1, 'cm1kvre460000pof5femyd3s4', 'Us Fighting', 'Cassi and I did fight a good -- Well.. We didn''t exactly "fight" I don''t think.. What we had going on was something like the struggles of stressed people bitching up a bit... God only knows how different she would have acted if she hadn''t been in the situation she was in. I admired her in some ways very deeply and can''t quite tell from where her emotional worrisomeness and ', 'It certainly has made me trust alcohol less. I think the alcohol problems I have been having ever since have had much to do with software work being a huge part of my time, my lack of TRUE and abounding rest days, and the concomitant incessant belief that more work is to be profitably and necessarily done the next day. 

Many couples are actually *unhappy*. We were alright, despite it all though. We had our connection, and if I had been all in, oh what it would have been.', NULL);
INSERT INTO public."Experience" (id, "userId", "order", "epochId", title, description, "basicAnalysis", "extendedAnalysisId") VALUES ('cmajrrma70005w0g504t93jla', 'cm1a23by40000i1juexnpwsl8', 4, 'cm1kvre470001pof5zv6887qk', 'My Broken Spirit saying "I may as well serve coffee in the woods than this. My sin was wanting much"', 'There came a point in Florida, where after all this time working and trying to get another tech job with even less luck, I thought, "Ah, I''ve misunderstood what seeking first the kingdom is: It''s dignity. I have no dignity as a jobless fool." I could not support myself, I could not make a free purchase, or go out with friends, what kind of ''sacrifice'' is that?? Simply not living does not seem to be a wise sacrifice, just because it *might* procure me money in the future.
Later I had another level of realization to this effect, that all these work based plans to produce something lucrative at the expense of my time, mind, sanity - soul, all this is quite directly selling one''s soul for money! I just told myself that if the money was for a good cause, then it was worth it. I saw the world with this sort of arbitrarily large upward possibility, which was motivating yet exhausting. It became less about learning and growing and more about demanding a certain vision of reality to come forth by using the growth for my own ends.', '', NULL);
INSERT INTO public."Experience" (id, "userId", "order", "epochId", title, description, "basicAnalysis", "extendedAnalysisId") VALUES ('cmajrrma70002w0g5g0otr71r', 'cm1a23by40000i1juexnpwsl8', 1, 'cm1kvre470001pof5zv6887qk', 'My Sexual Freakout', 'While working my brains out far too much, I lost a great deal of libido, while at the same time used constant porn to try to placate myself during a period of serious emptiness, mixed with obsessive trying and learning and processing new skills. I told myself that women were basically off limits for until I could get the job I wanted. I told myself that I broke up with Cassi for that reason. IN reality I would not have really stayed with her anyway. I did however want to go on the adventure of trying for this job. But I was wrong about this whole story that I needed to triple my income to be attractive or good enough (hence, Cassi dating me). The economy contributed to hurting it all here. In this state of hyperoveruse of porn, I moved to Texas, where the porn laws then prevented me from accessing PornHub, making me switch to constant use of Chaturbate, where trans streamers are mixed in by default.  The novelty of that, at first, was powerful enough that it was sufficiently outside of the over-use I''d been engaging in to be arousing. Even immediately I did not find it satisfying, and returned again to jerk off. This occurred the night my dad left me in Austin, having swept me away from Dallas--when I was panicked out of my skull.', 'I more strongly believe in the hormonal and psychogenic causes of other sexualities—although of course some degree of genetic and other causes are still plenty relevant. Even that went away.', NULL);
INSERT INTO public."Experience" (id, "userId", "order", "epochId", title, description, "basicAnalysis", "extendedAnalysisId") VALUES ('cmajrrma70004w0g51qgmvs0m', 'cm1a23by40000i1juexnpwsl8', 3, 'cm1kvre470001pof5zv6887qk', 'My Working Nonstop in Contrast to How Life Can be While Relaxing', 'From the period I left Epting, through the entire relationship with Cassi, despite my attempts otherwise (due to the motivations of imminent bankruptcy) all of Austin, my experience in Washington not dissimilar, and a great deal of Florida, I would wake up and code for 7 or 8 hours straight, if not into the evening. I had a place to work and pour energy and attention right at my finger tips, all the time. Gone were the days of random movies and videos, twitch streams, discord goofing around---ALL moments at the computer were moments I could be spending "investing in my future" and "creating something great" to "get a job." I''ve made some cool things, sure, but no one really cares, and it''s not clear that they should. I would get tired to the bone each and every day, so frequently, that I began truly forgetting what it was like to have some play left in me. This debilitated the relationship with Cassi, far beyond what was necessary. I was tired the NEXT day in many instances. The frame I had built for myself was awful. Constant presence and necessity of work. At first the necessity was pretty real. That whole frame persisted though, beyond its reasonability. ', 'This trip through Austin and the terrible work life at Washington, and the idiots at Austin firing me and the lunatics in Tampa, really loaded me up with more sense of dread and distrust for jobs and in some sense the unknown. I have wondered if I treated jobs wrong, in that they really are supposed to be a bit nonsense, but I have to apply that adaptive attention to attenuate them into a sensible nest.
I''ve gotten very negative from all this, the stress of it all. It''s felt like the micro story is as negative as the macro story, and we truly ought to be cast into the sea.
This negativity has weighed on me, and I dislike it. I don''t respect it. I respect that odd faith in the unknown. There''s something wiser about it. Good things are coming. Good things can be reached. Things are getting better and I am growing - there''s just more bullshit along the way than I had hoped. That''s okay though.', NULL);


--
-- Data for Name: ExtendedAnalysis; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: FutureAuthoring; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."FutureAuthoring" ("userId", "oneThingYouCouldDoBetter", "thingsToLearnAbout", "improveYourHabits", "socialLife", "leisureLife", "familyLife", "careerLife", "qualitiesYouAdmire", "idealFuture", "worstFuture") VALUES ('cm1a23by40000i1juexnpwsl8', 'I want to stop letting my fears and worries unsettle good things, blind me from good things, or confuse what could be clear. I ought to have far more confidence than I do, but I don''t think it shows because I am so laden with doubts and concern for the Good Right, so my demeanor comes out more wavering adn scattered than I want to be. I think I follow the Wisdom stuff down far reaches, but my heart itself tells me now what no outside source has made clear to me. I cannot live in shakiness, nor is questioning a plan the same as wise doubt. That being said I am bereft of sufficient knowledge and experience to alone-ly determine the quality and solidity of the paths I am on. It''s not like I''m alone in that, perhaps this generation more than many.', 'I want to learn more about birth, and child rearing
I want to learn conversational mandarin
I want to learn high level Russian, as well as colloquialisms far better.
I would like to refine my biologicalisms into a bit more utterable a form, with some specific.
I would like to refine and practice extroversion and charisma, via spiritual order and metabolic wellness.', 'I want to start back up a real reading habit, of diverse stuff, to include my language practice.
I want to watch Russian TV as well.

I want to provide more listening to my friends, and explore who they are.

I want to be more reliable with my salt intake.', 'As I get a volleyball and hiking and sitting and reading life set up, I want to be able to just invite people into that.
I want to diversify my exposure to religious thinkers of different sorts, rather than these sort of... uninventive Christians.

I can invite people to my place now!.. That sort of "invite people and just talk" thing got soured by my experience with Meryl and Josie.... Both lunatics by anyone''s standard. I was too hashed together with Meryl though, I did ', 'My leisure activity ', '', '', '', '', '');


--
-- Data for Name: Goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm2jg9ki60001768dnwfnksn3', 'cm1a23by40000i1juexnpwsl8', true, 0, 'Main Goal 1', 'Description', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000epof5mvx3pxyh', 'cm1a23by40000i1juexnpwsl8', false, 1, 'Build a Birdhouse', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000kpof5va5m1wma', 'cm1a23by40000i1juexnpwsl8', false, 2, 'Learn about the founding fathers', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000gpof5ugcb8k4a', 'cm1a23by40000i1juexnpwsl8', false, 3, 'Make 5 new friends', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000hpof5x68i4sf9', 'cm1a23by40000i1juexnpwsl8', false, 4, 'Stop using nicotine', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000fpof5vdyt0u37', 'cm1a23by40000i1juexnpwsl8', false, 5, 'Buy a new car', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000ipof5vyr69y7x', 'cm1a23by40000i1juexnpwsl8', false, 6, 'Increase my benchpress to 225lb', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000jpof5wqpiw11w', 'cm1a23by40000i1juexnpwsl8', false, 7, 'Run for local government', '', '', '', '', '', '');
INSERT INTO public."Goal" (id, "userId", "isMain", priority, title, description, "motiveAnalysis", "impactAnalysis", "strategicAnalysis", "obstacleAnalysis", "progressAnalysis") VALUES ('cm1kz52t1000lpof5o9mtmgb3', 'cm1a23by40000i1juexnpwsl8', false, 8, 'Start my own blog', '', '', '', '', '', '');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, name, password, email, "emailVerified", image, role) VALUES ('cm1a23by40000i1juexnpwsl8', NULL, 'w6uP8Tcg6K2QR905Rms8iXTlksL6OD1KOWBxTK7wxPI=', 'noah3141@gmail.com', NULL, NULL, 'admin');


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Epoch Epoch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Epoch"
    ADD CONSTRAINT "Epoch_pkey" PRIMARY KEY (id);


--
-- Name: Experience Experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Experience"
    ADD CONSTRAINT "Experience_pkey" PRIMARY KEY (id);


--
-- Name: ExtendedAnalysis ExtendedAnalysis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedAnalysis"
    ADD CONSTRAINT "ExtendedAnalysis_pkey" PRIMARY KEY ("experienceId");


--
-- Name: FutureAuthoring FutureAuthoring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FutureAuthoring"
    ADD CONSTRAINT "FutureAuthoring_pkey" PRIMARY KEY ("userId");


--
-- Name: Goal Goal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Epoch_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Epoch_order_key" ON public."Epoch" USING btree ("order");


--
-- Name: FutureAuthoring_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "FutureAuthoring_userId_key" ON public."FutureAuthoring" USING btree ("userId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Epoch Epoch_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Epoch"
    ADD CONSTRAINT "Epoch_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Experience Experience_epochId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Experience"
    ADD CONSTRAINT "Experience_epochId_fkey" FOREIGN KEY ("epochId") REFERENCES public."Epoch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Experience Experience_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Experience"
    ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ExtendedAnalysis ExtendedAnalysis_experienceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedAnalysis"
    ADD CONSTRAINT "ExtendedAnalysis_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES public."Experience"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ExtendedAnalysis ExtendedAnalysis_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedAnalysis"
    ADD CONSTRAINT "ExtendedAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FutureAuthoring FutureAuthoring_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FutureAuthoring"
    ADD CONSTRAINT "FutureAuthoring_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Goal Goal_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ygrsg6U6bfb4WmgqS479WGjMpxNV3dJMRQhbfOyuFN48rDEp5kOSZFX6sE1cgIL

