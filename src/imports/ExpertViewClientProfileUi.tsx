import svgPaths from "./svg-nzjn8av4md";

function ChevronLeft() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="ChevronLeft">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
            <path d="M7 13L1 7L7 1" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronLeft />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">{`Rachit's Profile`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[196.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <H />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Client Type:</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#3b82f6] h-[32px] relative rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[118.5px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Mantra Client</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[33554400px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Personal Client</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] px-[4px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span />
        <Container5 />
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="bg-white h-[41px] relative rounded-[10px] shrink-0 w-[111px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-1105px] pr-[1216px] pt-[-16px] relative size-full">
        <Option />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[41px] relative shrink-0 w-[461.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container4 />
        <Select />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[74px] items-start left-0 pb-px pt-[16px] px-[320px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[92px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92 92">
        <g id="svg">
          <path d={svgPaths.p37e25c00} fill="var(--fill-0, white)" id="Vector" />
          <path d="M27.6 32.2L36.8 41.4L64.4 23" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.52" />
          <path d={svgPaths.p1f0c8300} fill="var(--fill-0, #1E3A8A)" id="Vector_3" />
          <path d={svgPaths.p171e0100} fill="var(--fill-0, #1E3A8A)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function H1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-0 top-[8px] w-[121px]" data-name="h2">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] min-h-px min-w-px not-italic relative text-[#101828] text-[24px]">Rachit</p>
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[24px] left-0 top-[44px] w-[121px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#6a7282] text-[16px] top-[-2px] whitespace-nowrap">#168019</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[76px] w-[121px]" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[0px] text-[14px] whitespace-nowrap">
        <span className="leading-[20px]">{`Client Type: `}</span>
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#101828]">Mantra</span>
      </p>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[96px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <H1 />
        <P />
        <P1 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[96px] relative shrink-0 w-[233px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container10 />
        <Container12 />
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="absolute left-[21px] size-[16px] top-[13px]" data-name="Users">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Users">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[42px] relative rounded-[33554400px] shrink-0 w-[102.453px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#f0b100] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Users />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[63.5px] not-italic text-[#d08700] text-[16px] text-center top-[7px] whitespace-nowrap">Drop</p>
      </div>
    </div>
  );
}

function AlertTriangle() {
  return (
    <div className="absolute left-[21px] size-[16px] top-[13px]" data-name="AlertTriangle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="AlertTriangle">
          <path d={svgPaths.p19bc7f80} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[33554400px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#fb2c36] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <AlertTriangle />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[70px] not-italic text-[#e7000b] text-[16px] text-center top-[7px] whitespace-nowrap">Report</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[42px] relative shrink-0 w-[229.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[96px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container13 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[144px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[24px] px-[24px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Info">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_77_245)" id="Info">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333V10" id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667H10.0083" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_77_245">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[86.797px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Summary</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Info />
      <H2 />
    </div>
  );
}

function P2() {
  return (
    <div className="absolute h-[78px] left-0 top-0 w-[800px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#364153] text-[16px] top-[-2px] w-[792px]">Therapy for Hypertension, ADHD, Abuse, Addiction, Anger, Anxiety, Bipolar, Child Or Teen, Depression, Family, Insomnia, LGBTQ+, OCD, Panic Attacks, Relationship/ Couple, Sex Therapy, Spiritual, Stress Management, Trauma And PTSD, Workplace Issues, Employee Mental Health / EAP, Marriage, Divorce, Online Therapy</p>
    </div>
  );
}

function P3() {
  return (
    <div className="absolute h-[24px] left-0 top-[102px] w-[800px]" data-name="p">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[16px] top-[-2px] whitespace-nowrap">
        <span className="leading-[24px]">Price Per Session:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px]">{` Video - $0.01`}</span>
      </p>
    </div>
  );
}

function Globe() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[8px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_77_253)" id="Globe">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_77_253">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#eff6ff] h-[32px] relative rounded-[33554400px] shrink-0 w-[93.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Globe />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#1447e6] text-[14px] top-[5px] whitespace-nowrap">English</p>
      </div>
    </div>
  );
}

function MapPin() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[8px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MapPin">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#eff6ff] h-[32px] relative rounded-[33554400px] shrink-0 w-[152.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <MapPin />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#1447e6] text-[14px] top-[5px] whitespace-nowrap">United Kingdom</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-[142px] w-[800px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[182px] relative shrink-0 w-full" data-name="Container">
      <P2 />
      <P3 />
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[274px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[24px] px-[24px] relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Activity() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Activity">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_77_250)" id="Activity">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_77_250">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function H3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[67.531px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Actions</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Activity />
      <H3 />
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Calendar">
          <path d="M8 2V6" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 2V6" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32f12c00} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 10H21" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Calendar />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90.625px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Appointments</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-0 py-[16px] rounded-[10px] top-0 w-[147.188px]" data-name="button">
      <Div1 />
      <Span1 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FileText">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <FileText />
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[115.203px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[57.84px] not-italic text-[#364153] text-[14px] text-center top-[-1px] w-[65px]">Notes / Treatment</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[148px] items-center left-[163.19px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div2 />
      <Span2 />
    </div>
  );
}

function Pill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pill">
          <path d={svgPaths.p12225600} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8.5 8.5L15.5 15.5" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Pill />
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.859px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Prescriptions</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[326.39px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div3 />
      <Span3 />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CreditCard">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CreditCard">
          <path d={svgPaths.p1e533000} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 10H22" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <CreditCard />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.109px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Invoicing</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[489.59px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div4 />
      <Span4 />
    </div>
  );
}

function Shield() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Shield">
          <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Shield />
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[40px] relative shrink-0 w-[115.188px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[57.7px] not-italic text-[#364153] text-[14px] text-center top-[-1px] w-[71px]">Insurance / Claims</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[148px] items-center left-[652.8px] py-[16px] rounded-[10px] top-0 w-[147.188px]" data-name="button">
      <Div5 />
      <Span5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[148px] relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function GitBranch() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="GitBranch">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="GitBranch">
          <path d="M6 3V15" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33719c00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p4141780} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pea47f00} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <GitBranch />
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[53.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Pathway</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-0 py-[16px] rounded-[10px] top-0 w-[147.188px]" data-name="button">
      <Div6 />
      <Span6 />
    </div>
  );
}

function BarChart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="BarChart3">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="BarChart3">
          <path d={svgPaths.p36c5af80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M18 17V9" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M13 17V5" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 17V14" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <BarChart />
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[49.625px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Insights</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[163.19px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div7 />
      <Span7 />
    </div>
  );
}

function ShoppingBag() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ShoppingBag">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ShoppingBag">
          <path d={svgPaths.p311be280} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 6H21" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p8aac400} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <ShoppingBag />
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.828px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Orders</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[326.39px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div8 />
      <Span8 />
    </div>
  );
}

function MessageSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="MessageSquare">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MessageSquare">
          <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <MessageSquare />
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[114.625px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Request Feedback</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[489.59px] py-[16px] rounded-[10px] top-0 w-[147.203px]" data-name="button">
      <Div9 />
      <Span9 />
    </div>
  );
}

function DollarSign() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="DollarSign">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DollarSign">
          <path d="M12 2V22" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2ba0dca0} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[64px]" data-name="div">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <DollarSign />
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.203px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Earnings</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[128px] items-center left-[652.8px] py-[16px] rounded-[10px] top-0 w-[147.188px]" data-name="button">
      <Div10 />
      <Span10 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[341px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[441px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[24px] px-[24px] relative size-full">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[971px] items-start left-[320px] pt-[32px] px-[24px] top-[74px] w-[896px]" data-name="Container">
      <Container7 />
      <Container14 />
      <Container20 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[1045px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container6 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Expert View Client Profile UI">
      <Div />
    </div>
  );
}