import svgPaths from "./svg-9ix8uccon8";

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 13.3333">
            <path d={svgPaths.p37c3e100} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.66667">
            <path d="M12.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Rachel Green — AI Session Note</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">Feb 10, 2026</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[329.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Link />
        <Container3 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[34.5px] not-italic text-[#364153] text-[16px] text-center top-[-2px] whitespace-nowrap">Edit Note</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-[126.297px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[17px] py-px relative size-full">
        <Icon1 />
        <Text />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p39be50} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[58.5px] not-italic text-[16px] text-center text-white top-[-2px] whitespace-nowrap">{`Approve & Save`}</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#10b981] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
          <Icon2 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[309.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[81px] relative shrink-0 w-[1368px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[16px] px-[32px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Chief Complaint</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] whitespace-nowrap">Patient reports increased anxiety and difficulty sleeping over the past two weeks.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Subjective</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[702px]">{`Client states: "I've been feeling really overwhelmed lately. Work has been stressful, and I can't seem to turn my brain off at night. I'm constantly worried about deadlines and disappointing my team."`}</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Objective</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[671px]">Client appeared anxious during session, with increased fidgeting and rapid speech. Maintained good eye contact. Reported sleeping 4-5 hours per night. No signs of acute distress.</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Assessment</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[692px]">Client is experiencing moderate anxiety symptoms with associated insomnia. Symptoms appear related to work-related stress. Client has good insight into triggers and is motivated for treatment.</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Paragraph4 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Plan</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[678px]">Continue weekly therapy sessions. Introduce progressive muscle relaxation techniques. Discuss sleep hygiene strategies. Consider referral to psychiatrist for medication evaluation if symptoms persist.</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[118px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Paragraph5 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Session Themes</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[28px] items-start left-0 px-[12px] py-[4px] rounded-[33554400px] top-0 w-[95.156px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4169e1] text-[14px] whitespace-nowrap">Work stress</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[28px] items-start left-[103.16px] px-[12px] py-[4px] rounded-[33554400px] top-0 w-[133.719px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4169e1] text-[14px] whitespace-nowrap">Sleep disturbance</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[28px] items-start left-[244.88px] px-[12px] py-[4px] rounded-[33554400px] top-0 w-[155.297px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4169e1] text-[14px] whitespace-nowrap">Anxiety management</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[28px] items-start left-[408.17px] px-[12px] py-[4px] rounded-[33554400px] top-0 w-[132.141px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4169e1] text-[14px] whitespace-nowrap">Coping strategies</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container15 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Risk Assessment</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] whitespace-nowrap">No current suicidal or homicidal ideation. No plans or intent. Safety contract in place.</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Paragraph6 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Homework / Between-Session Tasks</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[404px]">
        <p className="mb-0">1. Practice progressive muscle relaxation daily before bed</p>
        <p className="mb-0">2. Keep a sleep diary for the next week</p>
        <p>3. Limit caffeine intake after 2 PM</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[118px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Paragraph7 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Next Session Focus</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2px] w-[642px]">Review sleep diary, assess effectiveness of relaxation techniques, explore additional coping strategies for work stress.</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading9 />
      <Paragraph8 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[1086px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-px pt-[33px] px-[33px] relative size-full">
        <Container9 />
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container16 />
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">How would you rate this AI-generated note?</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0018 21.0721">
            <path d={svgPaths.p18eb980} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0018 21.0721">
            <path d={svgPaths.p18eb980} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0018 21.0721">
            <path d={svgPaths.p18eb980} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0018 21.0721">
            <path d={svgPaths.p18eb980} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0018 21.0721">
            <path d={svgPaths.p18eb980} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
      <Container21 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#4169e1] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[11px] pr-[9px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container26() {
  return <div className="bg-[#4169e1] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container25() {
  return (
    <div className="bg-[#e5e7eb] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[378px] relative size-full">
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">15:32</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">45:23</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[567_0_0] h-[28px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container25 />
        <Container27 />
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="h-[31px] relative rounded-[10px] shrink-0 w-[79px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-861px] pr-[940px] pt-[-1337.5px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
        <Option3 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Container24 />
      <Dropdown />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col h-[57px] items-start pt-[17px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container23 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white h-[175px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Container20 />
        <Container22 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[1285px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container19 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[984_0_0] h-[1349px] min-h-px min-w-px relative" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[32px] pr-[184px] pt-[32px] relative size-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="flex-[191.5_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#4169e1] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[14px] pt-[12px] px-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#4169e1] text-[14px] text-center">Transcript</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="flex-[191.5_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[95.58px] not-italic text-[#6a7282] text-[14px] text-center top-[12px] whitespace-nowrap">Noteworthy</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[47px] relative shrink-0 w-[383px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px relative size-full">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[68.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] uppercase whitespace-nowrap">Dr. Wilson</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">00:00</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1px] w-[350px]">Good morning Rachel. How have you been since our last session?</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[60px] items-start left-0 top-0 w-[351px]" data-name="Container">
      <Container33 />
      <Paragraph10 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[84.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] uppercase whitespace-nowrap">Rachel Green</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">00:05</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[20px] items-start left-[35.27px] px-[8px] py-[2px] rounded-[33554400px] top-[40px] w-[59.25px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] whitespace-nowrap">stressful</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[20px] items-start left-[102.52px] px-[8px] py-[2px] rounded-[33554400px] top-[40px] w-[43.609px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] whitespace-nowrap">sleep</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1px] w-[306px]">{`Hi Dr. Wilson. I've been struggling a bit. Work has been really stressful, and I can't seem to sleep well.`}</p>
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[4px] h-[104px] items-start left-[16px] pt-[12px] px-[12px] rounded-[10px] top-[76px] w-[335px]" data-name="Container">
      <Container35 />
      <Paragraph11 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[68.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] uppercase whitespace-nowrap">Dr. Wilson</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">00:12</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1px] w-[310px]">{`I'm sorry to hear that. Can you tell me more about what's been happening at work?`}</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[60px] items-start left-0 top-[196px] w-[351px]" data-name="Container">
      <Container37 />
      <Paragraph12 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[84.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] uppercase whitespace-nowrap">Rachel Green</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[28.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">00:18</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[20px] items-start left-[79.77px] px-[8px] py-[2px] rounded-[33554400px] top-[60px] w-[56.297px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] whitespace-nowrap">worried</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[20px] items-start left-[144.06px] px-[8px] py-[2px] rounded-[33554400px] top-[60px] w-[61.406px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] whitespace-nowrap">deadline</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[20px] items-start left-[213.47px] px-[8px] py-[2px] rounded-[33554400px] top-[60px] w-[53.469px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] whitespace-nowrap">anxiety</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1px] w-[298px]">{`We have this huge project deadline coming up, and I feel like I'm constantly worried about disappointing my team. My brain just won't turn off at night.`}</p>
      <Text18 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[4px] h-[124px] items-start left-[16px] pt-[12px] px-[12px] rounded-[10px] top-[272px] w-[335px]" data-name="Container">
      <Container39 />
      <Paragraph13 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[396px] relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container34 />
      <Container36 />
      <Container38 />
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1302_0_0] min-h-px min-w-px relative w-[383px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-white h-[1349px] relative shrink-0 w-[384px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-px relative size-full">
        <Container29 />
        <Container30 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1349_0_0] min-h-px min-w-px relative w-[1368px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Container6 />
        <Container28 />
      </div>
    </div>
  );
}

function AiNoteViewer() {
  return (
    <div className="bg-[#F8FAFC] content-stretch flex flex-col h-[1430px] items-start relative shrink-0 w-full" data-name="AINoteViewer">
      <Container />
      <Container5 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1383_0_0] h-[1430px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[15px] relative size-full">
          <AiNoteViewer />
        </div>
      </div>
    </div>
  );
}

export default function ImplementSuggestions() {
  return (
    <div className="bg-[#F8FAFC] content-stretch flex items-start relative size-full" data-name="Implement Suggestions">
      <MainContent />
    </div>
  );
}