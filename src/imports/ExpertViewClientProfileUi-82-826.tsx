import svgPaths from "./svg-6quz505orf";

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
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">Prescriptions – Rachit</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[24px] relative shrink-0 w-[6.5px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="h-[23px] relative shrink-0 w-[91px]" data-name="select">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[-491.688px] pr-[582.688px] pt-[-24.5px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <H />
        <Span />
        <Select />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[390.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Container3 />
      </div>
    </div>
  );
}

function Span1() {
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
    <div className="h-[40px] relative shrink-0 w-[334.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span1 />
        <Container5 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[192px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="User">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="User">
          <path d={svgPaths.p67f12c8} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2c19cb00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[33554400px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <User />
      </div>
    </div>
  );
}

function P() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Rachit Sharma</p>
    </div>
  );
}

function P1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">#168019</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P />
        <P1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[164.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option5() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select1() {
  return (
    <div className="h-[39px] relative rounded-[10px] shrink-0 w-[94px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-1210px] pr-[1304px] pt-[-117.5px] relative size-full">
        <Option3 />
        <Option4 />
        <Option5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white content-stretch flex h-[80px] items-center justify-between left-[216px] px-[16px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[1104px]" data-name="Container">
      <Container7 />
      <Select1 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="FileText">
          <path d={svgPaths.p3713e00} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[172.266px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Create Prescription</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <FileText />
      <H1 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Chief Complaints</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[155.953px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Select chief complaints...</p>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Span2 />
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[24px] left-[118.11px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#1447e6] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute bg-[#dbeafe] h-[32px] left-0 rounded-[33554400px] top-0 w-[141.219px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#1447e6] text-[14px] top-[5px] whitespace-nowrap">Persistent cough</p>
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[24px] left-[122.8px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#1447e6] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span4() {
  return (
    <div className="absolute bg-[#dbeafe] h-[32px] left-[149.22px] rounded-[33554400px] top-0 w-[145.906px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#1447e6] text-[14px] top-[5px] whitespace-nowrap">Chest congestion</p>
      <Button5 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Span3 />
      <Span4 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[106px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Button3 />
      <Container14 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Medical History</p>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[148.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Select medical history...</p>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Span5 />
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[24px] left-[98.58px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#8200db] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span6() {
  return (
    <div className="absolute bg-[#f3e8ff] h-[32px] left-0 rounded-[33554400px] top-0 w-[121.688px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#8200db] text-[14px] top-[5px] whitespace-nowrap">Hypertension</p>
      <Button7 />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[24px] left-[114px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#8200db] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span7() {
  return (
    <div className="absolute bg-[#f3e8ff] h-[32px] left-[129.69px] rounded-[33554400px] top-0 w-[137.109px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#8200db] text-[14px] top-[5px] whitespace-nowrap">Type 2 Diabetes</p>
      <Button8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[24px] left-[100.69px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#8200db] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span8() {
  return (
    <div className="absolute bg-[#f3e8ff] h-[32px] left-[274.8px] rounded-[33554400px] top-0 w-[123.797px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#8200db] text-[14px] top-[5px] whitespace-nowrap">Heart Disease</p>
      <Button9 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Span6 />
      <Span7 />
      <Span8 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[106px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Button6 />
      <Container16 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Allergies</p>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[104.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Select allergies...</p>
      </div>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Span9 />
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[24px] left-[58.78px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#c10007] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span10() {
  return (
    <div className="absolute bg-[#ffe2e2] h-[32px] left-0 rounded-[33554400px] top-0 w-[81.891px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#c10007] text-[14px] top-[5px] whitespace-nowrap">Aspirin</p>
      <Button11 />
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute h-[24px] left-[67.08px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#c10007] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span11() {
  return (
    <div className="absolute bg-[#ffe2e2] h-[32px] left-[89.89px] rounded-[33554400px] top-0 w-[90.188px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#c10007] text-[14px] top-[5px] whitespace-nowrap">Codeine</p>
      <Button12 />
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute h-[24px] left-[48.22px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#c10007] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span12() {
  return (
    <div className="absolute bg-[#ffe2e2] h-[32px] left-[188.08px] rounded-[33554400px] top-0 w-[71.328px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#c10007] text-[14px] top-[5px] whitespace-nowrap">Latex</p>
      <Button13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Span10 />
      <Span11 />
      <Span12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[106px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Button10 />
      <Container18 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[350px] items-start relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container15 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[1056px]" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Provisional Diagnosis</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute h-[24px] left-[116.2px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#008236] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span13() {
  return (
    <div className="absolute bg-[#dcfce7] h-[32px] left-0 rounded-[33554400px] top-0 w-[139.313px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#008236] text-[14px] top-[5px] whitespace-nowrap">Acute Bronchitis</p>
      <Button14 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[32px] left-0 top-[28px] w-[1056px]" data-name="Container">
      <Span13 />
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute h-[20px] left-0 top-[72px] w-[46.281px]" data-name="button">
      <Plus />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">Add</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Container21 />
      <Button15 />
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[1056px]" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Diagnostic Tests</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute h-[24px] left-[90.56px] top-[4px] w-[11.109px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#a65f00] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
    </div>
  );
}

function Span14() {
  return (
    <div className="absolute bg-[#fef9c2] h-[32px] left-0 rounded-[33554400px] top-0 w-[113.672px]" data-name="span">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#a65f00] text-[14px] top-[5px] whitespace-nowrap">Chest X-Ray</p>
      <Button16 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[32px] left-0 top-[28px] w-[1056px]" data-name="Container">
      <Span14 />
    </div>
  );
}

function Plus1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute h-[20px] left-0 top-[72px] w-[46.281px]" data-name="button">
      <Plus1 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">Add</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container23 />
      <Button17 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Label5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[1056px]" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Medicine</p>
    </div>
  );
}

function Span15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[46.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Crocin</p>
      </div>
    </div>
  );
}

function Span16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[90.969px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">(Acetaminophen)</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Span15 />
      <Span16 />
    </div>
  );
}

function P2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">1 - Morning (Before food)</p>
    </div>
  );
}

function P3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Duration: 4 Days</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container29 />
        <P2 />
        <P3 />
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[11.109px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[6.5px] not-italic text-[#99a1af] text-[16px] text-center top-[-2px] whitespace-nowrap">×</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[68px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Button18 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[94px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-[28px] w-[1056px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container27 />
    </div>
  );
}

function Plus2() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute h-[20px] left-0 top-[134px] w-[46.281px]" data-name="button">
      <Plus2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">Add</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[154px] relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Container26 />
      <Button19 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Signature</p>
    </div>
  );
}

function P4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[116.313px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">✓ Signature added</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.406px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#155dfc] text-[14px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <P4 />
      <Button20 />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#f9fafb] h-[46px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <Container32 />
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[#3b82f6] h-[48px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[528.06px] not-italic text-[16px] text-center text-white top-[10px] whitespace-nowrap">Submit Prescription</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col h-[73px] items-start pt-[25px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button21 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[1130px] items-start left-[216px] pt-[24px] px-[24px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[193px] w-[1104px]" data-name="Container">
      <Container11 />
      <Container12 />
      <Container19 />
      <Container20 />
      <Container22 />
      <Container24 />
      <Container25 />
      <Container30 />
      <Container31 />
      <Container34 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[1339px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container6 />
      <Container10 />
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