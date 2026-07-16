import svgPaths from "./svg-msdops8rta";

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
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">{`Insurance & Claims - Rachit`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[333.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <H />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[818.75px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-[16px] px-[199.5px] top-0 w-[1551px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Shield() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Shield">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">{`Insurance & Claims`}</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[200.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Shield />
        <H1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[69px] items-center justify-between left-0 pb-px pl-[24px] pr-[879.703px] top-0 w-[1104px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[38px] relative shrink-0 w-[111.344px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[56.5px] not-italic text-[#4a5565] text-[16px] text-center top-[-2px] whitespace-nowrap">Insurance Info</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[38px] relative shrink-0 w-[55.719px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#3b82f6] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28px] not-italic text-[#3b82f6] text-[16px] text-center top-[-2px] whitespace-nowrap">Claims</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[32px] h-[38px] items-center relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39px] items-start left-0 pb-px px-[24px] top-[69px] w-[1104px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Filter">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Filter">
          <path d={svgPaths.p36bb6c80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
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

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option5() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="bg-white flex-[1_0_0] h-[39px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-271.5px] pr-[388.5px] pt-[-229px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
        <Option3 />
        <Option4 />
        <Option5 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[39px] relative shrink-0 w-[141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Filter />
        <Select />
      </div>
    </div>
  );
}

function Option6() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option7() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option8() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option9() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[39px] min-h-px min-w-px relative rounded-[10px]" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pl-[-400.5px] pr-[583.5px] pt-[-229px] relative size-full">
        <Option6 />
        <Option7 />
        <Option8 />
        <Option9 />
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Last 30 days</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-[125.25px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[13px] py-px relative size-full">
        <Calendar />
        <Span />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[39px] relative shrink-0 w-[473.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container11 />
        <Select1 />
        <Container12 />
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#3b82f6] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Plus />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[74px] not-italic text-[14px] text-center text-white top-[7px] whitespace-nowrap">New Claim</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[36px] relative shrink-0 w-[124.344px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button3 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[39px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
    </div>
  );
}

function Th() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-0 px-[16px] py-[12px] top-0 w-[126.469px]" data-name="th">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.6px] uppercase">Claim ID</p>
    </div>
  );
}

function Th1() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[126.47px] px-[16px] py-[12px] top-0 w-[136.266px]" data-name="th">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Date of Service</p>
    </div>
  );
}

function Th2() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[262.73px] px-[16px] py-[12px] top-0 w-[168.203px]" data-name="th">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.6px] uppercase">Payer</p>
    </div>
  );
}

function Th3() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[430.94px] px-[16px] py-[12px] top-0 w-[132.922px]" data-name="th">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Amount Billed</p>
    </div>
  );
}

function Th4() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[563.86px] px-[16px] py-[12px] top-0 w-[176.203px]" data-name="th">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Client Responsibility</p>
    </div>
  );
}

function Th5() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[740.06px] px-[16px] py-[12px] top-0 w-[108.766px]" data-name="th">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.6px] uppercase">Status</p>
    </div>
  );
}

function Th6() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[848.83px] px-[16px] py-[12px] top-0 w-[122.438px]" data-name="th">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Last Updated</p>
    </div>
  );
}

function Th7() {
  return (
    <div className="absolute content-stretch flex h-[40.5px] items-start left-[971.27px] px-[16px] py-[12px] top-0 w-[82.734px]" data-name="th">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Action</p>
    </div>
  );
}

function Tr() {
  return (
    <div className="absolute h-[40.5px] left-0 top-0 w-[1054px]" data-name="tr">
      <Th />
      <Th1 />
      <Th2 />
      <Th3 />
      <Th4 />
      <Th5 />
      <Th6 />
      <Th7 />
    </div>
  );
}

function Thead() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-b border-solid h-[40.5px] left-0 top-0 w-[1054px]" data-name="thead">
      <Tr />
    </div>
  );
}

function Td() {
  return (
    <div className="absolute h-[50px] left-0 top-0 w-[126.469px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">CLM-2024-001</p>
    </div>
  );
}

function Td1() {
  return (
    <div className="absolute h-[50px] left-[126.47px] top-0 w-[136.266px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 1, 2024</p>
    </div>
  );
}

function Td2() {
  return (
    <div className="absolute h-[50px] left-[262.73px] top-0 w-[168.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Blue Cross Blue Shield</p>
    </div>
  );
}

function Td3() {
  return (
    <div className="absolute h-[50px] left-[430.94px] top-0 w-[132.922px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">$150.00</p>
    </div>
  );
}

function Td4() {
  return (
    <div className="absolute h-[50px] left-[563.86px] top-0 w-[176.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">$30.00</p>
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute bg-[#d0fae5] content-stretch flex h-[24px] items-start left-[16px] px-[10px] py-[4px] rounded-[33554400px] top-[13.5px] w-[43.297px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Paid</p>
    </div>
  );
}

function Td5() {
  return (
    <div className="absolute h-[50px] left-[740.06px] top-0 w-[108.766px]" data-name="td">
      <Span1 />
    </div>
  );
}

function Td6() {
  return (
    <div className="absolute h-[50px] left-[848.83px] top-0 w-[122.438px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 15, 2024</p>
    </div>
  );
}

function Eye() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Eye">
          <path d={svgPaths.pad05c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15px] w-[50.672px]" data-name="button">
      <Eye />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">View</p>
    </div>
  );
}

function Td7() {
  return (
    <div className="absolute h-[50px] left-[971.27px] top-0 w-[82.734px]" data-name="td">
      <Button4 />
    </div>
  );
}

function Tr1() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[50px] left-0 top-0 w-[1054px]" data-name="tr">
      <Td />
      <Td1 />
      <Td2 />
      <Td3 />
      <Td4 />
      <Td5 />
      <Td6 />
      <Td7 />
    </div>
  );
}

function Td8() {
  return (
    <div className="absolute h-[50px] left-0 top-0 w-[126.469px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">CLM-2024-002</p>
    </div>
  );
}

function Td9() {
  return (
    <div className="absolute h-[50px] left-[126.47px] top-0 w-[136.266px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 8, 2024</p>
    </div>
  );
}

function Td10() {
  return (
    <div className="absolute h-[50px] left-[262.73px] top-0 w-[168.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Blue Cross Blue Shield</p>
    </div>
  );
}

function Td11() {
  return (
    <div className="absolute h-[50px] left-[430.94px] top-0 w-[132.922px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">$150.00</p>
    </div>
  );
}

function Td12() {
  return (
    <div className="absolute h-[50px] left-[563.86px] top-0 w-[176.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">$30.00</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[24px] items-start left-[16px] px-[10px] py-[4px] rounded-[33554400px] top-[13.5px] w-[76.75px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Submitted</p>
    </div>
  );
}

function Td13() {
  return (
    <div className="absolute h-[50px] left-[740.06px] top-0 w-[108.766px]" data-name="td">
      <Span2 />
    </div>
  );
}

function Td14() {
  return (
    <div className="absolute h-[50px] left-[848.83px] top-0 w-[122.438px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 9, 2024</p>
    </div>
  );
}

function Eye1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Eye">
          <path d={svgPaths.pad05c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15px] w-[50.672px]" data-name="button">
      <Eye1 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">View</p>
    </div>
  );
}

function Td15() {
  return (
    <div className="absolute h-[50px] left-[971.27px] top-0 w-[82.734px]" data-name="td">
      <Button5 />
    </div>
  );
}

function Tr2() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[50px] left-0 top-[50px] w-[1054px]" data-name="tr">
      <Td8 />
      <Td9 />
      <Td10 />
      <Td11 />
      <Td12 />
      <Td13 />
      <Td14 />
      <Td15 />
    </div>
  );
}

function Td16() {
  return (
    <div className="absolute h-[49.5px] left-0 top-0 w-[126.469px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">CLM-2024-003</p>
    </div>
  );
}

function Td17() {
  return (
    <div className="absolute h-[49.5px] left-[126.47px] top-0 w-[136.266px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 15, 2024</p>
    </div>
  );
}

function Td18() {
  return (
    <div className="absolute h-[49.5px] left-[262.73px] top-0 w-[168.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Blue Cross Blue Shield</p>
    </div>
  );
}

function Td19() {
  return (
    <div className="absolute h-[49.5px] left-[430.94px] top-0 w-[132.922px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14px] whitespace-nowrap">$150.00</p>
    </div>
  );
}

function Td20() {
  return (
    <div className="absolute h-[49.5px] left-[563.86px] top-0 w-[176.203px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">$30.00</p>
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-start left-[16px] px-[10px] py-[4px] rounded-[33554400px] top-[13.5px] w-[70.828px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Accepted</p>
    </div>
  );
}

function Td21() {
  return (
    <div className="absolute h-[49.5px] left-[740.06px] top-0 w-[108.766px]" data-name="td">
      <Span3 />
    </div>
  );
}

function Td22() {
  return (
    <div className="absolute h-[49.5px] left-[848.83px] top-0 w-[122.438px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[14px] whitespace-nowrap">Feb 16, 2024</p>
    </div>
  );
}

function Eye2() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Eye">
          <path d={svgPaths.pad05c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15px] w-[50.672px]" data-name="button">
      <Eye2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">View</p>
    </div>
  );
}

function Td23() {
  return (
    <div className="absolute h-[49.5px] left-[971.27px] top-0 w-[82.734px]" data-name="td">
      <Button6 />
    </div>
  );
}

function Tr3() {
  return (
    <div className="absolute h-[49.5px] left-0 top-[100px] w-[1054px]" data-name="tr">
      <Td16 />
      <Td17 />
      <Td18 />
      <Td19 />
      <Td20 />
      <Td21 />
      <Td22 />
      <Td23 />
    </div>
  );
}

function Tbody() {
  return (
    <div className="absolute bg-white h-[149.5px] left-0 top-[40.5px] w-[1054px]" data-name="tbody">
      <Tr1 />
      <Tr2 />
      <Tr3 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[190px] relative shrink-0 w-full" data-name="table">
      <Thead />
      <Tbody />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[192px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Table />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[255px] items-start left-[24px] top-[132px] w-[1056px]" data-name="Container">
      <Container9 />
      <Container14 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white h-[411px] left-[223.5px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[1104px]" data-name="Container">
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-[#f5f5f7] relative size-full" data-name="Expert View Client Profile UI">
      <Container />
      <Container3 />
    </div>
  );
}