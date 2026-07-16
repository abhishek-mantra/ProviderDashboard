import svgPaths from "./svg-0kivbzbsxu";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_74_837)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #1E293B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #1E293B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_74_837">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[32px] min-h-px min-w-px not-italic relative text-[#0f172b] text-[24px]">Tasks</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#62748e] text-[14px]">{`Track your daily wellness tasks & earn points`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[52px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d="M5 1.25V3.75" id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M10 1.25V3.75" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p191ca500} id="Vector_3" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M1.875 6.25H13.125" id="Vector_4" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M5 8.75H5.00625" id="Vector_5" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M7.5 8.75H7.50625" id="Vector_6" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M10 8.75H10.0063" id="Vector_7" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M5 11.25H5.00625" id="Vector_8" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M7.5 11.25H7.50625" id="Vector_9" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M10 11.25H10.0063" id="Vector_10" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#043570] text-[14px] whitespace-nowrap">All Services</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[38px] relative rounded-[16px] shrink-0 w-[140.109px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[13px] py-px relative size-full">
        <Icon1 />
        <Text />
        <Icon2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[52px] items-center left-[24px] top-[40px] w-[952px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_74_756)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_74_756">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#043570] text-[14px]">Focus Area</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Select the key concern areas for you</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[36px] relative shrink-0 w-[232.828px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_841)" id="Icon">
          <path d={svgPaths.p5c60b40} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 2.91667L11.0833 5.25" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_841">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function TasksPage1() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="TasksPage">
      <Container6 />
      <Button />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[26px] items-start left-0 px-[13px] py-[5px] rounded-[33554400px] top-0 w-[56.688px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#00c0ff] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Stress</p>
    </div>
  );
}

function TasksPage2() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="TasksPage">
      <Container9 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[124px] items-start left-[24px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[124px] w-[952px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <TasksPage1 />
      <TasksPage2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 9.33333H5.34" id="Vector_5" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 9.33333H8.00667" id="Vector_6" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 9.33333H10.6733" id="Vector_7" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 12H5.34" id="Vector_8" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12H8.00667" id="Vector_9" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 12H10.6733" id="Vector_10" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#043570] text-[14px]">{`Today's Tasks`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Take just a few minutes each day to prioritise your health and wellness.</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[36px] relative shrink-0 w-[427.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center whitespace-nowrap">2/10 done</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 10L8 6L4 10" id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[78.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text1 />
        <Icon6 />
      </div>
    </div>
  );
}

function TasksPage3() {
  return (
    <div className="h-[76px] relative shrink-0 w-full" data-name="TasksPage">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Container11 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3d881d00} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow() {
  return (
    <div className="bg-[#fed7aa] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Future Storyboarding</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[56.828px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Activity</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[16px] left-[64.83px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon8 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">5 min</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[16px] left-[118.63px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon9 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function TaskRow1() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph5 />
        <Container18 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <TaskRow />
      <TaskRow1 />
      <Icon10 />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 5.25V15.75" id="Vector" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2044ea00} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow2() {
  return (
    <div className="bg-[#e0e7ff] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Discomfort Zone Dare</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[51.469px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Article</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[16px] left-[59.47px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon12 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">3 min</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[16px] left-[113.27px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon13 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
      <Text7 />
    </div>
  );
}

function TaskRow3() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph6 />
        <Container21 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <TaskRow2 />
      <TaskRow3 />
      <Icon14 />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pb67f980} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow4() {
  return (
    <div className="bg-[#ddd6fe] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Mindful Breathing</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[48.594px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Audio</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[16px] left-[56.59px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon16 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">5 min</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[16px] left-[110.39px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon17 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
      <Text10 />
    </div>
  );
}

function TaskRow5() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph7 />
        <Container24 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <TaskRow4 />
      <TaskRow5 />
      <Icon18 />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c193bc0} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.5 12.75V6.75" id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9.75 12.75V3.75" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6 12.75V10.5" id="Vector_4" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow6() {
  return (
    <div className="bg-[#d1fae5] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Mood Tracker</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[54.906px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Tracker</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[16px] left-[62.91px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon20 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">2 min</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[16px] left-[116.7px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon21 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
      <Text13 />
    </div>
  );
}

function TaskRow7() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph8 />
        <Container27 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <TaskRow6 />
      <TaskRow7 />
      <Icon22 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 5.25V15.75" id="Vector" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2044ea00} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow8() {
  return (
    <div className="bg-[#e0e7ff] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Know What is Stress?</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[51.469px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Article</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[16px] left-[59.47px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon24 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">4 min</p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[16px] left-[113.27px] top-[2px] w-[59.406px]" data-name="Text">
      <Icon25 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">5 Points</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
      <Text16 />
    </div>
  );
}

function TaskRow9() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph9 />
        <Container30 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <TaskRow8 />
      <TaskRow9 />
      <Icon26 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
            <path d={svgPaths.p1ba1bc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-37.5%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 3.5">
            <path d={svgPaths.p14dd26c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#10b981] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#10b981] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pb67f980} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow10() {
  return (
    <div className="bg-[#ddd6fe] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon28 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[text-decoration-skip-ink:none] decoration-solid flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] line-through min-h-px min-w-px not-italic relative text-[#94a3b8] text-[14px]">Meditation on Gratitude</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[48.594px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Audio</p>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[16px] left-[56.59px] top-[2px] w-[52.266px]" data-name="Text">
      <Icon29 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">10 min</p>
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute h-[16px] left-[116.86px] top-[2px] w-[59.406px]" data-name="Text">
      <Icon30 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">5 Points</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text17 />
      <Text18 />
      <Text19 />
    </div>
  );
}

function TaskRow11() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph10 />
        <Container34 />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <TaskRow10 />
      <TaskRow11 />
      <Icon31 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
            <path d={svgPaths.p1ba1bc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-37.5%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 3.5">
            <path d={svgPaths.p14dd26c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#10b981] relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#10b981] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3d881d00} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow12() {
  return (
    <div className="bg-[#fed7aa] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[text-decoration-skip-ink:none] decoration-solid flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] line-through min-h-px min-w-px not-italic relative text-[#94a3b8] text-[14px]">Daily Gratitude Journal</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[56.828px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Activity</p>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[16px] left-[64.83px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon34 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">5 min</p>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[16px] left-[118.63px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon35 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Text21 />
      <Text22 />
    </div>
  );
}

function TaskRow13() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph11 />
        <Container38 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <TaskRow12 />
      <TaskRow13 />
      <Icon36 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_74_777)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M11.25 3.75L14.25 6.75" id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_74_777">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TaskRow14() {
  return (
    <div className="bg-[#fef3c7] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Fitness Level Assessment</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[79.469px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Assessment</p>
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[16px] left-[87.47px] top-[2px] w-[52.266px]" data-name="Text">
      <Icon38 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">10 min</p>
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[16px] left-[147.73px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon39 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">15 Points</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text23 />
      <Text24 />
      <Text25 />
    </div>
  );
}

function TaskRow15() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph12 />
        <Container41 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <TaskRow14 />
      <TaskRow15 />
      <Icon40 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p11c20100} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow16() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Morning Yoga Flow</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[47.609px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Video</p>
    </div>
  );
}

function Icon42() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[16px] left-[55.61px] top-[2px] w-[52.266px]" data-name="Text">
      <Icon42 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">20 min</p>
    </div>
  );
}

function Icon43() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[16px] left-[115.88px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon43 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">15 Points</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text26 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function TaskRow17() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph13 />
        <Container44 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <TaskRow16 />
      <TaskRow17 />
      <Icon44 />
    </div>
  );
}

function Container46() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c193bc0} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.5 12.75V6.75" id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9.75 12.75V3.75" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6 12.75V10.5" id="Vector_4" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TaskRow18() {
  return (
    <div className="bg-[#d1fae5] relative rounded-[16px] shrink-0 size-[48px]" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon45 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1e293b] text-[14px]">Blood Sugar Log</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#f3faff] content-stretch flex h-[20px] items-center left-0 px-[8px] py-[2px] rounded-[4px] top-0 w-[54.906px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00c0ff] text-[12px] whitespace-nowrap">Tracker</p>
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_74_831)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_74_831">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute h-[16px] left-[62.91px] top-[2px] w-[45.797px]" data-name="Text">
      <Icon46 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] not-italic text-[#64748b] text-[12px] top-0 whitespace-nowrap">2 min</p>
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p118b8900} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute h-[16px] left-[116.7px] top-[2px] w-[64.234px]" data-name="Text">
      <Icon47 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[16px] not-italic text-[#10b981] text-[12px] top-0 whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text29 />
      <Text30 />
      <Text31 />
    </div>
  );
}

function TaskRow19() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="TaskRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph14 />
        <Container47 />
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[12px] h-[72px] items-center relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <TaskRow18 />
      <TaskRow19 />
      <Icon48 />
    </div>
  );
}

function TasksPage4() {
  return (
    <div className="h-[825px] relative shrink-0 w-full" data-name="TasksPage">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[13px] px-[24px] relative size-full">
        <Container16 />
        <Container19 />
        <Container22 />
        <Container25 />
        <Container28 />
        <Container31 />
        <Container35 />
        <Container39 />
        <Container42 />
        <Container45 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="absolute left-[72.31px] size-[14px] top-[3px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[86.313px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[34px] not-italic text-[#2563eb] text-[14px] text-center top-[-1px] whitespace-nowrap">{`View More `}</p>
        <Icon49 />
      </div>
    </div>
  );
}

function TasksPage5() {
  return (
    <div className="content-stretch flex h-[45px] items-start justify-center pt-[13px] relative shrink-0 w-full" data-name="TasksPage">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col h-[870px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <TasksPage4 />
      <TasksPage5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white h-[948px] left-[24px] rounded-[16px] top-[272px] w-[952px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <TasksPage3 />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pea6a680} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3155f180} id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon50 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#043570] text-[14px]">Activity Stats</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Complete daily activity to get more reward points.</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[36px] relative shrink-0 w-[264.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function TasksPage6() {
  return (
    <div className="content-stretch flex gap-[10px] h-[36px] items-center relative shrink-0 w-full" data-name="TasksPage">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container52() {
  return <div className="absolute bg-[#f3faff] left-[250.66px] opacity-60 rounded-[33554400px] size-[56px] top-[-16px]" data-name="Container" />;
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_74_742)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6.75 9L8.25 10.5L11.25 7.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_74_742">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-[#043570] relative rounded-[16px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon51 />
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#043570] text-[20px] top-[-2px] whitespace-nowrap">5</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#043570] text-[10px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[39px] relative shrink-0 w-[48.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph17 />
        <Paragraph18 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[12px] top-[12px] w-[266.656px]" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-[#f3faff] border border-[rgba(0,192,255,0.3)] border-solid h-[65px] left-0 overflow-clip rounded-[16px] top-0 w-[292.656px]" data-name="Container">
      <Container52 />
      <Container53 />
    </div>
  );
}

function Container57() {
  return <div className="absolute bg-[#f3faff] left-[250.67px] opacity-60 rounded-[33554400px] size-[56px] top-[-16px]" data-name="Container" />;
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3d881d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="bg-[#00c0ff] relative rounded-[16px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#043570] text-[20px] top-[-2px] whitespace-nowrap">2/10</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px not-italic relative text-[#043570] text-[10px]">Today</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[39px] relative shrink-0 w-[43.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph19 />
        <Paragraph20 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[12px] top-[12px] w-[266.672px]" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-[#f3faff] border border-[rgba(0,192,255,0.3)] border-solid h-[65px] left-[304.66px] overflow-clip rounded-[16px] top-0 w-[292.672px]" data-name="Container">
      <Container57 />
      <Container58 />
    </div>
  );
}

function Container62() {
  return <div className="absolute bg-[#f3faff] left-[250.66px] opacity-60 rounded-[33554400px] size-[56px] top-[-16px]" data-name="Container" />;
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pe1f5000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#00c0ff] relative rounded-[16px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#043570] text-[20px] top-[-2px] whitespace-nowrap">50</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#043570] text-[10px] whitespace-nowrap">Points</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[39px] relative shrink-0 w-[26.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph21 />
        <Paragraph22 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[12px] top-[12px] w-[266.656px]" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute bg-[#f3faff] border border-[rgba(0,192,255,0.3)] border-solid h-[65px] left-[609.33px] overflow-clip rounded-[16px] top-0 w-[292.656px]" data-name="Container">
      <Container62 />
      <Container63 />
    </div>
  );
}

function TasksPage7() {
  return (
    <div className="h-[65px] relative shrink-0 w-full" data-name="TasksPage">
      <Container51 />
      <Container56 />
      <Container61 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[167px] items-start left-[24px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[1244px] w-[952px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <TasksPage6 />
      <TasksPage7 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12187900} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon54 />
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#043570] text-[14px]">Your Journey So Far</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Completed activity following pathway.</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[36px] relative shrink-0 w-[201.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph23 />
        <Paragraph24 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex gap-[10px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container69 />
    </div>
  );
}

function TasksPage8() {
  return (
    <div className="h-[77px] relative shrink-0 w-full" data-name="TasksPage">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[20px] px-[24px] relative size-full">
        <Container67 />
      </div>
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_761)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24f94f00} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_761">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon55 />
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">{`How to Book & Join a Session`}</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(100,116,139,0.5)]">Jan 14, 2025</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph25 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function JourneyRow() {
  return (
    <div className="h-[38px] relative shrink-0 w-[224.609px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container71 />
        <Container72 />
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#22c55e] text-[12px] text-right whitespace-nowrap">10 Points</p>
    </div>
  );
}

function Icon56() {
  return (
    <div className="absolute left-[8.77px] size-[10px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.pa362de0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon56 />
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[48.77px] not-italic text-[10px] text-[rgba(100,116,139,0.5)] text-right top-[-1px] whitespace-nowrap">Video</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph27 />
        <Paragraph28 />
      </div>
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function JourneyRow1() {
  return (
    <div className="h-[31px] relative shrink-0 w-[74.391px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container73 />
        <Icon57 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <JourneyRow />
          <JourneyRow1 />
        </div>
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_761)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24f94f00} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_761">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon58 />
      </div>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">How TherapyMantra Works?</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(100,116,139,0.5)]">Dec 24, 2023</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph29 />
        <Paragraph30 />
      </div>
    </div>
  );
}

function JourneyRow2() {
  return (
    <div className="h-[38px] relative shrink-0 w-[214.641px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container75 />
        <Container76 />
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#22c55e] text-[12px] text-right whitespace-nowrap">20 Points</p>
    </div>
  );
}

function Icon59() {
  return (
    <div className="absolute left-[8.77px] size-[10px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.pa362de0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon59 />
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[48.77px] not-italic text-[10px] text-[rgba(100,116,139,0.5)] text-right top-[-1px] whitespace-nowrap">Video</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph31 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function JourneyRow3() {
  return (
    <div className="h-[31px] relative shrink-0 w-[74.391px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container77 />
        <Icon60 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <JourneyRow2 />
          <JourneyRow3 />
        </div>
      </div>
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_761)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24f94f00} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_761">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon61 />
      </div>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">Heart-Healthy Recipe Guide</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(100,116,139,0.5)]">Jan 14, 2025</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph33 />
        <Paragraph34 />
      </div>
    </div>
  );
}

function JourneyRow4() {
  return (
    <div className="h-[38px] relative shrink-0 w-[211.672px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#22c55e] text-[12px] text-right whitespace-nowrap">5 Points</p>
    </div>
  );
}

function Icon62() {
  return (
    <div className="absolute left-0 size-[10px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_74_809)" id="Icon">
          <path d="M5 2.91667V8.75" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
          <path d={svgPaths.p1605dd00} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_74_809">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon62 />
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[43px] not-italic text-[10px] text-[rgba(100,116,139,0.5)] text-right top-[-1px] whitespace-nowrap">Article</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph35 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function JourneyRow5() {
  return (
    <div className="h-[31px] relative shrink-0 w-[68.016px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container81 />
        <Icon63 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <JourneyRow4 />
          <JourneyRow5 />
        </div>
      </div>
    </div>
  );
}

function Icon64() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_761)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24f94f00} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_761">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container83() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon64 />
      </div>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">Refer a Provider</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(100,116,139,0.5)]">Jan 1, 2023</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph37 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function JourneyRow6() {
  return (
    <div className="h-[38px] relative shrink-0 w-[138.094px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#22c55e] text-[12px] text-right whitespace-nowrap">50 Points</p>
    </div>
  );
}

function Icon65() {
  return (
    <div className="absolute left-[2.06px] size-[10px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_74_732)" id="Icon">
          <path d={svgPaths.p31e53b00} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_74_732">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon65 />
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[49.06px] not-italic text-[10px] text-[rgba(100,116,139,0.5)] text-right top-[-1px] whitespace-nowrap">Activity</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph39 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function JourneyRow7() {
  return (
    <div className="h-[31px] relative shrink-0 w-[74.391px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container85 />
        <Icon66 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[63px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
          <JourneyRow6 />
          <JourneyRow7 />
        </div>
      </div>
    </div>
  );
}

function Icon67() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_74_761)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24f94f00} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_74_761">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon67 />
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="content-stretch flex h-[20px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">Publish a Post About MantraCare</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(100,116,139,0.5)]">Nov 14, 2023</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function JourneyRow8() {
  return (
    <div className="h-[38px] relative shrink-0 w-[243.781px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container87 />
        <Container88 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#22c55e] text-[12px] text-right whitespace-nowrap">0 Points</p>
    </div>
  );
}

function Icon68() {
  return (
    <div className="absolute left-0 size-[10px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_74_732)" id="Icon">
          <path d={svgPaths.p31e53b00} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_74_732">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon68 />
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[47px] not-italic text-[10px] text-[rgba(100,116,139,0.5)] text-right top-[-1px] whitespace-nowrap">Activity</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="flex-[1_0_0] h-[31px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph43 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Icon69() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function JourneyRow9() {
  return (
    <div className="h-[31px] relative shrink-0 w-[72.328px]" data-name="JourneyRow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container89 />
        <Icon69 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[62px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <JourneyRow8 />
          <JourneyRow9 />
        </div>
      </div>
    </div>
  );
}

function TasksPage9() {
  return (
    <div className="content-stretch flex flex-col h-[314px] items-start relative shrink-0 w-full" data-name="TasksPage">
      <Container70 />
      <Container74 />
      <Container78 />
      <Container82 />
      <Container86 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[28px] opacity-40 relative rounded-[12px] shrink-0 w-[47.813px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center whitespace-nowrap">Prev</p>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Page 1 of 1</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[28px] opacity-40 relative rounded-[12px] shrink-0 w-[49.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center whitespace-nowrap">Next</p>
      </div>
    </div>
  );
}

function TasksPage10() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="TasksPage">
      <div aria-hidden="true" className="absolute border-[rgba(0,192,255,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center pr-[0.016px] pt-px relative size-full">
          <Button2 />
          <Text32 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-white h-[446px] left-[24px] rounded-[16px] top-[1435px] w-[952px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <TasksPage8 />
        <TasksPage9 />
        <TasksPage10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1000px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Container5 />
        <Container10 />
        <Container48 />
        <Container66 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] h-[1945px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[140px] relative size-full">
        <MainContent />
      </div>
    </div>
  );
}

function TasksPage() {
  return (
    <div className="bg-[#f8fafc] h-[1945px] relative shrink-0 w-full" data-name="TasksPage">
      <div className="content-stretch flex items-start pl-[256px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f6f8fb] content-stretch flex flex-col h-[862px] items-start left-0 top-0 w-[1536px]" data-name="Body">
      <TasksPage />
    </div>
  );
}

function Icon70() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3 9H15" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 4.5H15" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 13.5H15" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon70 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[13.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">M</p>
      </div>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="bg-[#7c3aed] relative rounded-[12px] shrink-0 size-[32px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text33 />
      </div>
    </div>
  );
}

function Sidebar2() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#020817] text-[18px] top-[-1px] whitespace-nowrap">MantraCare</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[inherit] size-full">
        <Sidebar1 />
        <Sidebar2 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-[60px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-px pl-[12px] relative size-full">
        <Button4 />
        <Container91 />
      </div>
    </div>
  );
}

function Icon71() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function NavItem() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon71 />
          <Text34 />
        </div>
      </div>
    </div>
  );
}

function Icon72() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Care Team</p>
      </div>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon72 />
          <Text35 />
        </div>
      </div>
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Appointments</p>
      </div>
    </div>
  );
}

function NavItem2() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon73 />
          <Text36 />
        </div>
      </div>
    </div>
  );
}

function Icon74() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14eb5b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3fe63d80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[20px] relative shrink-0 w-[33.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Tasks</p>
      </div>
    </div>
  );
}

function NavItem3() {
  return (
    <div className="bg-[#00c0ff] h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon74 />
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[49.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Insights</p>
      </div>
    </div>
  );
}

function NavItem4() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon75 />
          <Text38 />
        </div>
      </div>
    </div>
  );
}

function Icon76() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cf7de80} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ebe9ac0} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.5833V5.41667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Billing</p>
      </div>
    </div>
  );
}

function NavItem5() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon76 />
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[250px] items-start left-[8px] top-[8px] w-[239px]" data-name="Container">
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
      <NavItem4 />
      <NavItem5 />
    </div>
  );
}

function Container93() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[270px] w-[223px]" data-name="Container" />;
}

function Container94() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[335px] w-[223px]" data-name="Container" />;
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pdf995c0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 15H12.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 18.3333H11.6667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[20px] relative shrink-0 w-[99.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Share Feedback</p>
      </div>
    </div>
  );
}

function NavItem6() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon77 />
          <Text40 />
        </div>
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_44_293)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_44_293">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Support</p>
      </div>
    </div>
  );
}

function NavItem7() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon78 />
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[82px] items-start left-[8px] top-[348px] w-[239px]" data-name="Container">
      <NavItem6 />
      <NavItem7 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pc4ad940} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V17.5" id="Vector_2" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p24a96bc0} id="Vector_3" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c64b180} id="Vector_4" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[20px] relative shrink-0 w-[148.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#059669] text-[14px] text-center whitespace-nowrap">Invite a friend, Earn $15</p>
      </div>
    </div>
  );
}

function NavItem8() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[8px] pl-[12px] rounded-[16px] top-[283px] w-[239px]" data-name="NavItem">
      <Icon79 />
      <Text42 />
    </div>
  );
}

function Sidebar3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container92 />
        <Container93 />
        <Container94 />
        <Container95 />
        <NavItem8 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="bg-[#2d9cdb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">R</p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[20px] relative shrink-0 w-[94.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Returning User</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Container96 />
          <Text43 />
        </div>
      </div>
    </div>
  );
}

function Sidebar4() {
  return (
    <div className="h-[65px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9px] px-[8px] relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-white h-[862px] left-0 top-[1083px] w-[256px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-px relative rounded-[inherit] size-full">
        <Sidebar />
        <Sidebar3 />
        <Sidebar4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function MantraCareServicesDashboard() {
  return (
    <div className="bg-white relative size-full" data-name="MantraCare services dashboard">
      <Body />
      <Container90 />
    </div>
  );
}