import svgPaths from "./svg-156raq00vj";

function Sidebar() {
  return <div className="h-[1391px] shrink-0 w-[320px]" data-name="Sidebar" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1fa66600} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M14 7V14L18.6667 16.3333" id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f3faff] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d9eeff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[2px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#020817] text-[24px] top-[-2px] tracking-[-0.6px] whitespace-nowrap">Availability</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#64748b] text-[15px] top-[-2px] whitespace-nowrap">Mark your availability here to schedule your appointment</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[378.734_0_0] h-[64.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[64.5px] relative shrink-0 w-[450.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4350_1481)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1481">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[84.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#043570] text-[14px] text-center whitespace-nowrap">Asia/Calcutta</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[36px] relative rounded-[12px] shrink-0 w-[162.031px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[13px] py-[9px] relative size-full">
        <Icon1 />
        <Text />
        <Icon2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[64.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button />
    </div>
  );
}

function Tab() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex h-[49px] items-center justify-center left-0 pb-[17px] pt-[5px] px-px top-0 w-[82.078px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic relative shrink-0 text-[#00c0ff] text-[18px] text-center whitespace-nowrap">Time Slot</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="absolute content-stretch flex h-[49px] items-center justify-center left-[130.08px] pb-[17px] pt-[5px] px-px top-0 w-[67.063px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic relative shrink-0 text-[#94a3b8] text-[18px] text-center whitespace-nowrap">Day Off</p>
    </div>
  );
}

function Tab2() {
  return (
    <div className="absolute content-stretch flex h-[49px] items-center justify-center left-[245.14px] pb-[17px] pt-[5px] px-px top-0 w-[76.656px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] not-italic relative shrink-0 text-[#94a3b8] text-[18px] text-center whitespace-nowrap">Calendar</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="h-[49px] relative rounded-[16px] shrink-0 w-[321.797px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Tab />
        <Tab1 />
        <Tab2 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28.5px] left-0 not-italic text-[#043570] text-[19px] top-[-2px] tracking-[-0.475px] whitespace-nowrap">Sunday</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">8:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[208.359px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon3 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Button1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">7:00 PM - 10:00 PM</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[212.766px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon5 />
        <Text2 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Button2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[117px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[189.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container10 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[2px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#00c0ff] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col h-[191.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container15 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28.5px] left-0 not-italic text-[#043570] text-[19px] top-[-2px] tracking-[-0.475px] whitespace-nowrap">Monday</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">7:00 PM - 10:00 PM</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[14px] h-[52.5px] items-center px-[25px] py-[15px] relative rounded-[33554400px] shrink-0 w-[212.766px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Icon7 />
      <Text3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Button3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[149px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[2px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#00c0ff] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col h-[151px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container20 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28.5px] left-0 not-italic text-[#043570] text-[19px] top-[-2px] tracking-[-0.475px] whitespace-nowrap">Tuesday</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">8:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[208.359px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon9 />
        <Text4 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Button4 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">7:00 PM - 10:00 PM</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[212.766px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon11 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Button5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[117px] items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container26 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[213.5px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container23 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[2px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#00c0ff] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col h-[215.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container28 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28.5px] left-0 not-italic text-[#043570] text-[19px] top-[-2px] tracking-[-0.475px] whitespace-nowrap">Wednesday</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">8:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[208.359px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon13 />
        <Text6 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Button6 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">7:00 PM - 10:00 PM</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[212.766px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon15 />
        <Text7 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Button7 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4350_1486)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.5V9L12 10.5" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4350_1486">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#043570] text-[15px] top-[-2px] whitespace-nowrap">7:00 PM - 10:00 PM</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[52.5px] relative rounded-[33554400px] shrink-0 w-[212.766px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(243, 250, 255) 0%, rgb(240, 249, 255) 20%, rgb(238, 249, 255) 40%, rgb(235, 248, 255) 60%, rgb(233, 248, 255) 80%, rgb(230, 247, 255) 100%)" }} data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.2)] border-solid inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[25px] py-[15px] relative size-full">
        <Icon17 />
        <Text8 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 15">
            <path d={svgPaths.p35bdd700} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 5">
            <path d={svgPaths.p18bd6f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="opacity-70 relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[52.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Button8 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[181.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container33 />
      <Container35 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[254px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Container30 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[878px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[33px] px-[33px] relative size-full">
        <Container8 />
        <Container16 />
        <Container21 />
        <Container29 />
      </div>
    </div>
  );
}

function Availability1() {
  return (
    <div className="absolute h-[20px] left-[40px] top-[15.25px] w-[13.688px]" data-name="Availability">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[20px] text-center text-white top-[-2px] whitespace-nowrap">+</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#043570] h-[50.5px] relative rounded-[16px] shrink-0 w-[210.281px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Availability1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-[117.19px] not-italic text-[15px] text-center text-white top-[12px] whitespace-nowrap">Add Time Slots</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[98.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pt-[48px] px-[260.859px] relative size-full">
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function TabPanel() {
  return (
    <div className="flex-[976.5_0_0] min-h-px min-w-px relative w-[732px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container7 />
        <Container37 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[1041.5px] items-start relative shrink-0 w-full" data-name="Container">
      <TabList />
      <TabPanel />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f3faff] h-[1107.5px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[33px] px-[33px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f8fafc] h-[48px] relative rounded-[12px] shrink-0 w-[120.016px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[33px] py-[9px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Previous</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[78.63px] size-[16px] top-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#043570] h-[56px] relative rounded-[16px] shrink-0 w-[106.625px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-[37.5px] not-italic text-[15px] text-center text-white top-[14.75px] whitespace-nowrap">Submit</p>
        <Icon19 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[81px] items-start justify-between pt-[25px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[1220.5px] items-start relative shrink-0 w-full" data-name="Form">
      <Container5 />
      <Container38 />
    </div>
  );
}

function Availability() {
  return (
    <div className="bg-white flex-[864_0_0] h-[1391px] min-h-px min-w-px relative rounded-[16px]" data-name="Availability">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[40px] items-start pb-px pt-[33px] px-[33px] relative size-full">
        <Container1 />
        <Form />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[1455px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[32px] items-start p-[32px] relative size-full">
        <Sidebar />
        <Availability />
      </div>
    </div>
  );
}

function OnboardingLayout() {
  return (
    <div className="bg-[#f8fafc] h-[1520px] relative shrink-0 w-full" data-name="OnboardingLayout">
      <div className="content-stretch flex flex-col items-start pt-[65px] px-[128px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute content-stretch flex flex-col h-[896px] items-start left-0 top-0 w-[1536px]" data-name="Body">
      <OnboardingLayout />
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon20 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[50px] not-italic text-[#00c0ff] text-[14px] text-center top-[-1px] whitespace-nowrap">Go Back</p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88688 3.98688">
            <path d={svgPaths.p3e007700} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88022 3.98688">
            <path d={svgPaths.p309e7540} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <Button13 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px not-italic relative text-[#020817] text-[24px]">Step 5</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[40px] leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">Mark your availability here to schedule your appointment</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb8f0300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Basic Information</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb8f0300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Description</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb8f0300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Profile Picture</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container47 />
        <Container48 />
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb8f0300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Videos (Optional)</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12.109px] relative size-full">
        <Text9 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[200_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#043570] text-[16px] top-[-2px] whitespace-nowrap">Availability</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-gradient-to-r from-[#f3faff] h-[58px] relative rounded-[16px] shrink-0 to-[rgba(243,250,255,0.5)] w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex gap-[12px] items-start p-[13px] relative size-full">
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[330px] items-start relative shrink-0 w-full" data-name="Container">
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[474px] items-start left-[24px] top-[24px] w-[270px]" data-name="Container">
      <Container40 />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p38966ca0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14ca9100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[26.5px] not-italic text-[16px] text-center text-white top-[-2px] whitespace-nowrap">Logout</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-[#043570] content-stretch flex gap-[8px] h-[48px] items-center justify-center left-[24px] px-[95.156px] py-[12px] rounded-[16px] top-[664px] w-[270px]" data-name="Button">
      <Icon26 />
      <Text10 />
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute h-[18px] left-[24px] top-[724px] w-[270px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[135.09px] not-italic text-[#64748b] text-[12px] text-center top-0 whitespace-nowrap">Contact Support</p>
    </div>
  );
}

function OnboardingLayout1() {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[768px] left-[160px] rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[320px]" data-name="OnboardingLayout">
      <Container39 />
      <Button19 />
      <Button20 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[12.39%_56.61%_12.3%_27.17%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3969 24.0986">
        <g id="Group">
          <path d={svgPaths.p185406c0} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[30.7%_43.62%_11.21%_46%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6091 18.5889">
        <g id="Group">
          <path d={svgPaths.p34d04800} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[30.7%_31.26%_12.3%_58.73%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0458 18.2406">
        <g id="Group">
          <path d={svgPaths.p25c32c00} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[18.13%_22.78%_11.21%_70.47%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1627 22.6103">
        <g id="Group">
          <path d={svgPaths.p2f17cf00} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[30.7%_14.51%_12.3%_79.24%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.40111 18.2406">
        <g id="Group">
          <path d={svgPaths.p3bc5b170} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[30.7%_2.97%_11.21%_86.66%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6091 18.5889">
        <g id="Group">
          <path d={svgPaths.p34d04800} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[12.39%_2.97%_11.21%_27.17%]" data-name="Group">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[32px] relative shrink-0 w-[150.391px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[4.73%_75.34%_11.57%_1.83%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3273 26.7821">
            <path d={svgPaths.p2f8efa00} fill="var(--fill-0, #00C0FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[39.58%_78.97%_1.06%_6.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0311 18.9926">
            <path d={svgPaths.pd036580} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.72%_81.91%_40.36%_14.7%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.09428 5.09428">
            <path d={svgPaths.p2437b350} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <Group />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[32px] relative shrink-0 w-[150.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4350_792)" id="Icon">
          <path d={svgPaths.p1a356800} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5fcf400} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 3.33333H9.33333" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 1.33333H5.33333" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1bfa36c0} id="Vector_5" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 12H13.3333" id="Vector_6" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4350_792">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">English</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[69.359px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon28 />
        <Text11 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
          <Container54 />
          <Button21 />
        </div>
      </div>
    </div>
  );
}

function OnboardingLayout2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px px-[128px] top-0 w-[1536px]" data-name="OnboardingLayout">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container53 />
    </div>
  );
}

export default function RedesignProviderLoginForm() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="Redesign Provider Login Form">
      <Body />
      <OnboardingLayout1 />
      <OnboardingLayout2 />
    </div>
  );
}