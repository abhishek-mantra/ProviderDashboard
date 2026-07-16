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
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">CMS-1500 Health Insurance Claim Form</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[466.219px]" data-name="Container">
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
        <div className="content-stretch flex items-center justify-between pr-[813.781px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-[16px] px-[128px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function H1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[322.672px]" data-name="h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">CMS-1500 Health Insurance Claim Form</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="bg-[#364153] h-[24px] relative rounded-[4px] shrink-0 w-[81.031px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[10px] py-[4px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">APPROVED</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="bg-[#dbeafe] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[4px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[10px] py-[4px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Claim Details ▼</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[193.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span />
        <Span1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <H1 />
      <Container6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[92px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[24px] px-[24px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[13.328px] left-[8px] top-[8px] w-[560px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[#0a0a0a] text-[10px] top-[-1px] whitespace-nowrap">PAYER ID</p>
    </div>
  );
}

function Input() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[8px] top-[25.33px] w-[560px]" data-name="input" />;
}

function Container12() {
  return (
    <div className="absolute h-[13.328px] left-[8px] top-[54.33px] w-[560px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] left-0 not-italic text-[#0a0a0a] text-[10px] top-[-1px] whitespace-nowrap">Carrier</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 2</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[67px] items-start left-[8px] top-[71.66px] w-[560px]" data-name="Container">
      <Input1 />
      <Input2 />
      <Input3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[171px] left-0 top-0 w-[578px]" data-name="Container">
      <Container11 />
      <Input />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[249px]">1. MEDICARE MEDICAID TRICARE CHAMPVA GROUP HEALTH PLAN FECA BLK LUNG OTHER</p>
    </div>
  );
}

function Input4() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[81.266px]" data-name="label">
      <Input4 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Medicare`}</p>
    </div>
  );
}

function Input5() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label1() {
  return (
    <div className="absolute h-[24px] left-[85.27px] top-0 w-[80.813px]" data-name="label">
      <Input5 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Medicaid`}</p>
    </div>
  );
}

function Input6() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label2() {
  return (
    <div className="absolute h-[24px] left-[170.08px] top-0 w-[76.375px]" data-name="label">
      <Input6 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` TRICARE`}</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`1a. INSURED'S I.D. NUMBER`}</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container19() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container20 />
        <Input7 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[66px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container19 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`2. PATIENT'S NAME`}</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">John</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input9() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">First name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input10() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Middle name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-0 top-0 w-[187.328px]" data-name="Container">
      <Container23 />
      <Input8 />
      <Input9 />
      <Input10 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`3. PATIENT'S BIRTH DATE`}</p>
    </div>
  );
}

function Input11() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.109px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input12() {
  return (
    <div className="absolute h-[22px] left-[59.11px] top-0 w-[55.109px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input13() {
  return (
    <div className="absolute h-[22px] left-[118.22px] top-0 w-[55.109px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[22px] left-[6px] top-[22px] w-[173.328px]" data-name="Container">
      <Input11 />
      <Input12 />
      <Input13 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[48px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SEX</p>
    </div>
  );
}

function Input14() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[28.797px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input14 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` M`}</p>
      </div>
    </div>
  );
}

function Input15() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.047px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input15 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` F`}</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[6px] top-[60px] w-[173.328px]" data-name="Container">
      <Label3 />
      <Label4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-[195.33px] top-0 w-[187.328px]" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[6px] top-[6px] w-[173.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`4. INSURED'S NAME`}</p>
    </div>
  );
}

function Input16() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[22px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Last name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input17() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[45px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">First name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input18() {
  return (
    <div className="absolute h-[21px] left-[6px] top-[68px] w-[173.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Middle</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[97px] left-[390.66px] top-0 w-[187.328px]" data-name="Container">
      <Container30 />
      <Input16 />
      <Input17 />
      <Input18 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[97px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Container29 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[171px] items-start left-[590px] top-0 w-[578px]" data-name="Container">
      <Container15 />
      <Container21 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[171px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container14 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`5. PATIENT'S ADDRESS`}</p>
    </div>
  );
}

function Input19() {
  return (
    <div className="absolute h-[21px] left-[7px] top-[23px] w-[272px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input20() {
  return (
    <div className="absolute h-[21px] left-[7px] top-[46px] w-[272px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input21() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input22() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[21px] left-[7px] top-[69px] w-[272px]" data-name="Container">
      <Input21 />
      <Input22 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[94px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TELEPHONE</p>
    </div>
  );
}

function Input23() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[7px] top-[106px] w-[272px]" data-name="input" />;
}

function Container32() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container33 />
      <Input19 />
      <Input20 />
      <Container34 />
      <Container35 />
      <Input23 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">6. PATIENT RELATIONSHIP TO INSURED</p>
    </div>
  );
}

function Input24() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="label">
      <Input24 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Self`}</p>
    </div>
  );
}

function Input25() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="label">
      <Input25 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Spouse`}</p>
    </div>
  );
}

function Input26() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="label">
      <Input26 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Child`}</p>
    </div>
  );
}

function Input27() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="label">
      <Input27 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` Other`}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[102px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Label6 />
      <Label7 />
      <Label8 />
    </div>
  );
}

function Container36() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`7. INSURED'S ADDRESS`}</p>
    </div>
  );
}

function Input28() {
  return (
    <div className="absolute h-[21px] left-[7px] top-[23px] w-[272px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input29() {
  return (
    <div className="absolute h-[21px] left-[7px] top-[46px] w-[272px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input30() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input31() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[21px] left-[7px] top-[69px] w-[272px]" data-name="Container">
      <Input30 />
      <Input31 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[94px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TELEPHONE</p>
    </div>
  );
}

function Input32() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[7px] top-[106px] w-[272px]" data-name="input" />;
}

function Container39() {
  return (
    <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container40 />
      <Input28 />
      <Input29 />
      <Container41 />
      <Container42 />
      <Input32 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">8. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="col-4 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container44 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[134px] relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container36 />
      <Container39 />
      <Container43 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`9. OTHER INSURED'S NAME`}</p>
    </div>
  );
}

function Input33() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`a. OTHER INSURED'S POLICY OR GROUP NUMBER`}</p>
    </div>
  );
}

function Input34() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. RESERVED FOR NUCC USE</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. INSURANCE PLAN NAME OR PROGRAM NAME</p>
    </div>
  );
}

function Input35() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container46() {
  return (
    <div className="col-1 h-[265.656px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container47 />
        <Input33 />
        <Container48 />
        <Input34 />
        <Container49 />
        <Container50 />
        <Container51 />
        <Input35 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`10. IS PATIENT'S CONDITION RELATED TO:`}</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">a. EMPLOYMENT? (Current or Previous)</p>
    </div>
  );
}

function Input36() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input36 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function Input37() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input37 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Label9 />
      <Label10 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-0 w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. AUTO ACCIDENT?</p>
    </div>
  );
}

function Input38() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input38 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function Input39() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input39 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-0 top-[14px] w-[272px]" data-name="Container">
      <Label11 />
      <Label12 />
    </div>
  );
}

function Input40() {
  return (
    <div className="absolute h-[21px] left-[8px] top-[38px] w-[64px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">State</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
      <Input40 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. OTHER ACCIDENT?</p>
    </div>
  );
}

function Input41() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input41 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function Input42() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input42 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Label13 />
      <Label14 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. CLAIM CODES (Designated by NUCC)</p>
    </div>
  );
}

function Input43() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[35px] items-start relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Input43 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[182px] items-start relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container58 />
      <Container61 />
      <Container64 />
    </div>
  );
}

function Container52() {
  return (
    <div className="col-2 h-[265.656px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`11. INSURED'S POLICY GROUP OR FECA NUMBER`}</p>
    </div>
  );
}

function Input44() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[7px] top-[23px] w-[272px]" data-name="input" />;
}

function Container68() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[52px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`a. INSURED'S DATE OF BIRTH / SEX`}</p>
    </div>
  );
}

function Input45() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input46() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input47() {
  return (
    <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[22px] left-[7px] top-[68px] w-[272px]" data-name="Container">
      <Input45 />
      <Input46 />
      <Input47 />
    </div>
  );
}

function Input48() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[28.797px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input48 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` M`}</p>
      </div>
    </div>
  );
}

function Input49() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.047px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input49 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` F`}</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[7px] top-[94px] w-[272px]" data-name="Container">
      <Label15 />
      <Label16 />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[122px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">b. OTHER CLAIM ID (Designated by NUCC)</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[138px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">c. INSURANCE PLAN NAME OR PROGRAM NAME</p>
    </div>
  );
}

function Input50() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-[7px] top-[154px] w-[272px]" data-name="input" />;
}

function Container73() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[179px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">d. IS THERE ANOTHER HEALTH BENEFIT PLAN?</p>
    </div>
  );
}

function Input51() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input51 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function Input52() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input52 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[7px] top-[195px] w-[272px]" data-name="Container">
      <Label17 />
      <Label18 />
    </div>
  );
}

function Container66() {
  return (
    <div className="col-3 h-[265.656px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container67 />
      <Input44 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <Input50 />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[10.656px] left-[7px] top-[7px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">{`READ BACK OF FORM BEFORE COMPLETING & SIGNING THIS FORM`}</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[21.66px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE`}</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute h-[48px] left-[7px] top-[37.66px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[259px]">I authorize the release of any medical or other information necessary to process this claim. I also request payment of government benefits either to myself or to the party who accepts assignment below.</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[4px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function Input53() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[16px] w-[272px]" data-name="input" />;
}

function Container81() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[41px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">DATE</p>
    </div>
  );
}

function Input54() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[53px] w-[272px]" data-name="input" />;
}

function Container79() {
  return (
    <div className="absolute border-[#d1d5dc] border-solid border-t h-[75px] left-[7px] top-[93.66px] w-[272px]" data-name="Container">
      <Container80 />
      <Input53 />
      <Container81 />
      <Input54 />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[176.66px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE`}</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[24px] left-[7px] top-[192.66px] w-[272px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[236px]">I authorize payment of medical benefits to the undersigned physician or supplier for services described below.</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function Input55() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex flex-col h-[38px] items-start left-[7px] pt-[5px] top-[220.66px] w-[272px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-solid border-t inset-0 pointer-events-none" />
      <Container85 />
      <Input55 />
    </div>
  );
}

function Container75() {
  return (
    <div className="col-4 h-[265.656px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container76 />
      <Container77 />
      <Container78 />
      <Container79 />
      <Container82 />
      <Container83 />
      <Container84 />
    </div>
  );
}

function Container45() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[265.656px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container52 />
      <Container66 />
      <Container75 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute h-[24px] left-[7px] top-[7px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[174px]">14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)</p>
    </div>
  );
}

function Input56() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input57() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input58() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[35px] w-[174px]" data-name="Container">
      <Input56 />
      <Input57 />
      <Input58 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[61px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">QUAL:</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-192px] size-0 top-[-937.66px]" data-name="option" />;
}

function Option1() {
  return <div className="absolute left-[-192px] size-0 top-[-937.66px]" data-name="option" />;
}

function Select() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[24px] left-[7px] top-[73px] w-[174px]" data-name="select">
      <Option />
      <Option1 />
    </div>
  );
}

function Container87() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container88 />
      <Container89 />
      <Container90 />
      <Select />
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">15. OTHER DATE</p>
    </div>
  );
}

function Input59() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input60() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input61() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[23px] w-[174px]" data-name="Container">
      <Input59 />
      <Input60 />
      <Input61 />
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[49px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">QUAL:</p>
    </div>
  );
}

function Option2() {
  return <div className="absolute left-[-388px] size-0 top-[-925.66px]" data-name="option" />;
}

function Select1() {
  return (
    <div className="absolute border border-[#d1d5dc] border-solid h-[24px] left-[7px] top-[61px] w-[174px]" data-name="select">
      <Option2 />
    </div>
  );
}

function Container91() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container92 />
      <Container93 />
      <Container94 />
      <Select1 />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute h-[24px] left-[7px] top-[7px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[168px]">16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[35px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">FROM:</p>
    </div>
  );
}

function Input62() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input63() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input64() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[49px] w-[174px]" data-name="Container">
      <Input62 />
      <Input63 />
      <Input64 />
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[75px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TO:</p>
    </div>
  );
}

function Input65() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input66() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input67() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[89px] w-[174px]" data-name="Container">
      <Input65 />
      <Input66 />
      <Input67 />
    </div>
  );
}

function Container95() {
  return (
    <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container96 />
      <Container97 />
      <Container98 />
      <Container99 />
      <Container100 />
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[162px]">17. NAME OF REFERRING PROVIDER OR OTHER SOURCE</p>
    </div>
  );
}

function Input68() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">17a.</p>
    </div>
  );
}

function Input69() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">17b. NPI</p>
    </div>
  );
}

function Input70() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container101() {
  return (
    <div className="col-4 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container102 />
        <Input68 />
        <Container103 />
        <Input69 />
        <Container104 />
        <Input70 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute h-[24px] left-[7px] top-[7px] w-[174px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[171px]">18. HOSPITALIZATION DATES RELATED TO CURRENT SERVICES</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[35px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">FROM:</p>
    </div>
  );
}

function Input71() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input72() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input73() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[49px] w-[174px]" data-name="Container">
      <Input71 />
      <Input72 />
      <Input73 />
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[75px] w-[174px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">TO:</p>
    </div>
  );
}

function Input74() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input75() {
  return (
    <div className="absolute h-[22px] left-[59.33px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">DD</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input76() {
  return (
    <div className="absolute h-[22px] left-[118.66px] top-0 w-[55.328px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container110() {
  return (
    <div className="absolute h-[22px] left-[7px] top-[89px] w-[174px]" data-name="Container">
      <Input74 />
      <Input75 />
      <Input76 />
    </div>
  );
}

function Container105() {
  return (
    <div className="col-5 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container106 />
      <Container107 />
      <Container108 />
      <Container109 />
      <Container110 />
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[161px]">19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="textarea">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container111() {
  return (
    <div className="col-6 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container112 />
        <Textarea />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[145px] relative shrink-0 w-full" data-name="Container">
      <Container87 />
      <Container91 />
      <Container95 />
      <Container101 />
      <Container105 />
      <Container111 />
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">20. OUTSIDE LAB?</p>
    </div>
  );
}

function Input77() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.234px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input77 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` YES`}</p>
      </div>
    </div>
  );
}

function Input78() {
  return <div className="absolute left-0 size-[12px] top-[6px]" data-name="input" />;
}

function Label20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[38.375px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Input78 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[14px] not-italic text-[#0a0a0a] text-[16px] top-[-2px] whitespace-nowrap">{` NO`}</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start left-[7px] top-[23px] w-[272px]" data-name="Container">
      <Label19 />
      <Label20 />
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[51px] w-[272px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">$ CHARGES</p>
    </div>
  );
}

function Input79() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[7px] top-[65px] w-[272px]" data-name="input" />;
}

function Container114() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container115 />
      <Container116 />
      <Container117 />
      <Input79 />
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] left-0 not-italic text-[#0a0a0a] text-[9px] top-0 w-[264px]">21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY Relate A-L to service line below (24E)</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">A.</p>
    </div>
  );
}

function Input80() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">ICD Ind.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container121() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container122 />
      <Input80 />
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">B.</p>
    </div>
  );
}

function Input81() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container123() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container124 />
      <Input81 />
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">C.</p>
    </div>
  );
}

function Input82() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container125() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Container126 />
      <Input82 />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">D.</p>
    </div>
  );
}

function Input83() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container127() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Container128 />
      <Input83 />
    </div>
  );
}

function Container120() {
  return (
    <div className="gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[80px] relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <Container123 />
      <Container125 />
      <Container127 />
    </div>
  );
}

function Container118() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container119 />
        <Container120 />
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">22. RESUBMISSION CODE</p>
    </div>
  );
}

function Input84() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">ORIGINAL REF. NO.</p>
    </div>
  );
}

function Input85() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container129() {
  return (
    <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container130 />
        <Input84 />
        <Container131 />
        <Input85 />
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">23. PRIOR AUTHORIZATION NUMBER</p>
    </div>
  );
}

function Input86() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container132() {
  return (
    <div className="col-4 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container133 />
        <Input86 />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[122px] relative shrink-0 w-full" data-name="Container">
      <Container114 />
      <Container118 />
      <Container129 />
      <Container132 />
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[21.313px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] w-[64px]">24. A. DATE(S) OF SERVICE</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute border-[#d1d5dc] border-r border-solid h-[10.656px] left-0 top-0 w-[44.078px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-[21.41px] not-italic text-[#0a0a0a] text-[8px] text-center top-[-1px] whitespace-nowrap">From</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="absolute h-[10.656px] left-[44.08px] top-0 w-[44.078px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-[21.98px] not-italic text-[#0a0a0a] text-[8px] text-center top-[-1px] whitespace-nowrap">To</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <Container139 />
      <Container140 />
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container137 />
      <Container138 />
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">B. PLACE OF SERVICE</p>
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container142 />
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">C. EMG</p>
    </div>
  );
}

function Container143() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container144 />
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">D. PROCEDURES, SERVICES, OR SUPPLIES</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[9.328px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[9.333px] left-0 not-italic text-[#0a0a0a] text-[7px] top-[-1px] whitespace-nowrap">(Explain Unusual Circumstances)</p>
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute h-[10.656px] left-0 top-0 w-[92.672px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">CPT/HCPCS</p>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute h-[10.656px] left-[92.67px] top-0 w-[92.672px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">MODIFIER</p>
    </div>
  );
}

function Container148() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <Container149 />
      <Container150 />
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container146 />
      <Container147 />
      <Container148 />
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">E. DIAGNOSIS POINTER</p>
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container152 />
    </div>
  );
}

function Container154() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">F. $ CHARGES</p>
    </div>
  );
}

function Container153() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container154 />
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">G. DAYS OR UNITS</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container156 />
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">H. EPSDT Family Plan</p>
    </div>
  );
}

function Container157() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container158 />
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">I. ID QUAL</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39.969px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container160 />
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute h-[10.656px] left-[975.66px] top-[4px] w-[186.328px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">J. RENDERING PROVIDER ID. #</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="bg-[#f9fafb] h-[40.969px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container136 />
      <Container141 />
      <Container143 />
      <Container145 />
      <Container151 />
      <Container153 />
      <Container155 />
      <Container157 />
      <Container159 />
      <Container161 />
    </div>
  );
}

function Input87() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input88() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input87 />
      <Input88 />
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container164 />
    </div>
  );
}

function Input89() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input89 />
    </div>
  );
}

function Input90() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input90 />
    </div>
  );
}

function Input91() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input92() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container167() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input91 />
      <Input92 />
    </div>
  );
}

function Input93() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input93 />
    </div>
  );
}

function Input94() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input94 />
    </div>
  );
}

function Input95() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container170() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input95 />
    </div>
  );
}

function Input96() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span2() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label21() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input96 />
      <Span2 />
    </div>
  );
}

function Input97() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span3() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label22() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input97 />
      <Span3 />
    </div>
  );
}

function Input98() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span4() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label23() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input98 />
      <Span4 />
    </div>
  );
}

function Input99() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span5() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label24() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input99 />
      <Span5 />
    </div>
  );
}

function Input100() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span6() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label25() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input100 />
      <Span6 />
    </div>
  );
}

function Input101() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span7() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label26() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input101 />
      <Span7 />
    </div>
  );
}

function Container172() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label21 />
      <Label22 />
      <Label23 />
      <Label24 />
      <Label25 />
      <Label26 />
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container172 />
    </div>
  );
}

function Input102() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input102 />
    </div>
  );
}

function Input103() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container162() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container163 />
      <Container165 />
      <Container166 />
      <Container167 />
      <Container168 />
      <Container169 />
      <Container170 />
      <Container171 />
      <Container173 />
      <Input103 />
    </div>
  );
}

function Input104() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input105() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input104 />
      <Input105 />
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container176 />
    </div>
  );
}

function Input106() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container177() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input106 />
    </div>
  );
}

function Input107() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container178() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input107 />
    </div>
  );
}

function Input108() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input109() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input108 />
      <Input109 />
    </div>
  );
}

function Input110() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container180() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input110 />
    </div>
  );
}

function Input111() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container181() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input111 />
    </div>
  );
}

function Input112() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container182() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input112 />
    </div>
  );
}

function Input113() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span8() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label27() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input113 />
      <Span8 />
    </div>
  );
}

function Input114() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span9() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label28() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input114 />
      <Span9 />
    </div>
  );
}

function Input115() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span10() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label29() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input115 />
      <Span10 />
    </div>
  );
}

function Input116() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span11() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label30() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input116 />
      <Span11 />
    </div>
  );
}

function Input117() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span12() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label31() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input117 />
      <Span12 />
    </div>
  );
}

function Input118() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span13() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label32() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input118 />
      <Span13 />
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label27 />
      <Label28 />
      <Label29 />
      <Label30 />
      <Label31 />
      <Label32 />
    </div>
  );
}

function Container183() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container184 />
    </div>
  );
}

function Input119() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container185() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input119 />
    </div>
  );
}

function Input120() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container174() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container175 />
      <Container177 />
      <Container178 />
      <Container179 />
      <Container180 />
      <Container181 />
      <Container182 />
      <Container183 />
      <Container185 />
      <Input120 />
    </div>
  );
}

function Input121() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input122() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container188() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input121 />
      <Input122 />
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container188 />
    </div>
  );
}

function Input123() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input123 />
    </div>
  );
}

function Input124() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input124 />
    </div>
  );
}

function Input125() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input126() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container191() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input125 />
      <Input126 />
    </div>
  );
}

function Input127() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input127 />
    </div>
  );
}

function Input128() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container193() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input128 />
    </div>
  );
}

function Input129() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container194() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input129 />
    </div>
  );
}

function Input130() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span14() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label33() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input130 />
      <Span14 />
    </div>
  );
}

function Input131() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span15() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label34() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input131 />
      <Span15 />
    </div>
  );
}

function Input132() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span16() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label35() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input132 />
      <Span16 />
    </div>
  );
}

function Input133() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span17() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label36() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input133 />
      <Span17 />
    </div>
  );
}

function Input134() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span18() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label37() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input134 />
      <Span18 />
    </div>
  );
}

function Input135() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span19() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label38() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input135 />
      <Span19 />
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label33 />
      <Label34 />
      <Label35 />
      <Label36 />
      <Label37 />
      <Label38 />
    </div>
  );
}

function Container195() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container196 />
    </div>
  );
}

function Input136() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container197() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input136 />
    </div>
  );
}

function Input137() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container186() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container187 />
      <Container189 />
      <Container190 />
      <Container191 />
      <Container192 />
      <Container193 />
      <Container194 />
      <Container195 />
      <Container197 />
      <Input137 />
    </div>
  );
}

function Input138() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input139() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container200() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input138 />
      <Input139 />
    </div>
  );
}

function Container199() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container200 />
    </div>
  );
}

function Input140() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container201() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input140 />
    </div>
  );
}

function Input141() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container202() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input141 />
    </div>
  );
}

function Input142() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input143() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container203() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input142 />
      <Input143 />
    </div>
  );
}

function Input144() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container204() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input144 />
    </div>
  );
}

function Input145() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container205() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input145 />
    </div>
  );
}

function Input146() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container206() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input146 />
    </div>
  );
}

function Input147() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span20() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label39() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input147 />
      <Span20 />
    </div>
  );
}

function Input148() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span21() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label40() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input148 />
      <Span21 />
    </div>
  );
}

function Input149() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span22() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label41() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input149 />
      <Span22 />
    </div>
  );
}

function Input150() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span23() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label42() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input150 />
      <Span23 />
    </div>
  );
}

function Input151() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span24() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label43() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input151 />
      <Span24 />
    </div>
  );
}

function Input152() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span25() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label44() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input152 />
      <Span25 />
    </div>
  );
}

function Container208() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label39 />
      <Label40 />
      <Label41 />
      <Label42 />
      <Label43 />
      <Label44 />
    </div>
  );
}

function Container207() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container208 />
    </div>
  );
}

function Input153() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container209() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input153 />
    </div>
  );
}

function Input154() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container198() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container199 />
      <Container201 />
      <Container202 />
      <Container203 />
      <Container204 />
      <Container205 />
      <Container206 />
      <Container207 />
      <Container209 />
      <Input154 />
    </div>
  );
}

function Input155() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input156() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container212() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input155 />
      <Input156 />
    </div>
  );
}

function Container211() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container212 />
    </div>
  );
}

function Input157() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container213() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input157 />
    </div>
  );
}

function Input158() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container214() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input158 />
    </div>
  );
}

function Input159() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input160() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container215() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input159 />
      <Input160 />
    </div>
  );
}

function Input161() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container216() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input161 />
    </div>
  );
}

function Input162() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container217() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input162 />
    </div>
  );
}

function Input163() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container218() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input163 />
    </div>
  );
}

function Input164() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span26() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label45() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input164 />
      <Span26 />
    </div>
  );
}

function Input165() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span27() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label46() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input165 />
      <Span27 />
    </div>
  );
}

function Input166() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span28() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label47() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input166 />
      <Span28 />
    </div>
  );
}

function Input167() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span29() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label48() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input167 />
      <Span29 />
    </div>
  );
}

function Input168() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span30() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label49() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input168 />
      <Span30 />
    </div>
  );
}

function Input169() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span31() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label50() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input169 />
      <Span31 />
    </div>
  );
}

function Container220() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label45 />
      <Label46 />
      <Label47 />
      <Label48 />
      <Label49 />
      <Label50 />
    </div>
  );
}

function Container219() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container220 />
    </div>
  );
}

function Input170() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container221() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input170 />
    </div>
  );
}

function Input171() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container210() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container211 />
      <Container213 />
      <Container214 />
      <Container215 />
      <Container216 />
      <Container217 />
      <Container218 />
      <Container219 />
      <Container221 />
      <Input171 />
    </div>
  );
}

function Input172() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input173() {
  return (
    <div className="absolute h-[21px] left-[45.08px] top-0 w-[43.078px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">MM DD YY</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container224() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <Input172 />
      <Input173 />
    </div>
  );
}

function Container223() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-0 pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container224 />
    </div>
  );
}

function Input174() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container225() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[97.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input174 />
    </div>
  );
}

function Input175() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container226() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[194.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input175 />
    </div>
  );
}

function Input176() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">CPT/HCPCS</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input177() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Description</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container227() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[54px] items-start left-[291.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[194.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input176 />
      <Input177 />
    </div>
  );
}

function Input178() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container228() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[485.83px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input178 />
    </div>
  );
}

function Input179() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container229() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[582.98px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input179 />
    </div>
  );
}

function Input180() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container230() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[680.16px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input180 />
    </div>
  );
}

function Input181() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span32() {
  return (
    <div className="h-[12px] relative shrink-0 w-[3.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Label51() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-0 w-[43.078px]" data-name="label">
      <Input181 />
      <Span32 />
    </div>
  );
}

function Input182() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span33() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Label52() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-0 w-[43.078px]" data-name="label">
      <Input182 />
      <Span33 />
    </div>
  );
}

function Input183() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span34() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Label53() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[14px] w-[43.078px]" data-name="label">
      <Input183 />
      <Span34 />
    </div>
  );
}

function Input184() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span35() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.609px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Label54() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[14px] w-[43.078px]" data-name="label">
      <Input184 />
      <Span35 />
    </div>
  );
}

function Input185() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span36() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.453px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Label55() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-0 top-[28px] w-[43.078px]" data-name="label">
      <Input185 />
      <Span36 />
    </div>
  );
}

function Input186() {
  return <div className="shrink-0 size-[10px]" data-name="input" />;
}

function Span37() {
  return (
    <div className="h-[12px] relative shrink-0 w-[4.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[8px] whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Label56() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[12px] items-center left-[45.08px] top-[28px] w-[43.078px]" data-name="label">
      <Input186 />
      <Span37 />
    </div>
  );
}

function Container232() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Label51 />
      <Label52 />
      <Label53 />
      <Label54 />
      <Label55 />
      <Label56 />
    </div>
  );
}

function Container231() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[777.33px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.156px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Container232 />
    </div>
  );
}

function Input187() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container233() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[874.48px] pl-[4px] pr-[5px] pt-[4px] top-0 w-[97.172px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r border-solid inset-0 pointer-events-none" />
      <Input187 />
    </div>
  );
}

function Input188() {
  return <div className="absolute border border-[#d1d5dc] border-solid h-[22px] left-[975.66px] top-[4px] w-[186.328px]" data-name="input" />;
}

function Container222() {
  return (
    <div className="h-[55px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
      <Container223 />
      <Container225 />
      <Container226 />
      <Container227 />
      <Container228 />
      <Container229 />
      <Container230 />
      <Container231 />
      <Container233 />
      <Input188 />
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[372.969px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <Container135 />
        <Container162 />
        <Container174 />
        <Container186 />
        <Container198 />
        <Container210 />
        <Container222 />
      </div>
    </div>
  );
}

function Container236() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">25. FEDERAL TAX I.D. NUMBER</p>
    </div>
  );
}

function Input189() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input190() {
  return <div className="shrink-0 size-[12px]" data-name="input" />;
}

function Span38() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">SSN</p>
      </div>
    </div>
  );
}

function Label57() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[30.719px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Input190 />
        <Span38 />
      </div>
    </div>
  );
}

function Input191() {
  return <div className="shrink-0 size-[12px]" data-name="input" />;
}

function Span39() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">EIN</p>
      </div>
    </div>
  );
}

function Label58() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[28.188px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Input191 />
        <Span39 />
      </div>
    </div>
  );
}

function Container237() {
  return (
    <div className="content-stretch flex gap-[8px] h-[13.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label57 />
      <Label58 />
    </div>
  );
}

function Container235() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-0 pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container236 />
      <Input189 />
      <Container237 />
    </div>
  );
}

function Container239() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`26. PATIENT'S ACCOUNT NO.`}</p>
    </div>
  );
}

function Input192() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container238() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[196px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container239 />
      <Input192 />
    </div>
  );
}

function Container241() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">27. ACCEPT ASSIGNMENT?</p>
    </div>
  );
}

function Container242() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">(For govt. claims, see back)</p>
    </div>
  );
}

function Input193() {
  return <div className="shrink-0 size-[12px]" data-name="input" />;
}

function Span40() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">YES</p>
      </div>
    </div>
  );
}

function Label59() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[28.766px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Input193 />
        <Span40 />
      </div>
    </div>
  );
}

function Input194() {
  return <div className="shrink-0 size-[12px]" data-name="input" />;
}

function Span41() {
  return (
    <div className="flex-[1_0_0] h-[13.5px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">NO</p>
      </div>
    </div>
  );
}

function Label60() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[27.719px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Input194 />
        <Span41 />
      </div>
    </div>
  );
}

function Container243() {
  return (
    <div className="content-stretch flex gap-[8px] h-[13.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label59 />
      <Label60 />
    </div>
  );
}

function Container240() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[392px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container241 />
      <Container242 />
      <Container243 />
    </div>
  );
}

function Container245() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">28. TOTAL CHARGE</p>
    </div>
  );
}

function Input195() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">$</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container244() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[588px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container245 />
      <Input195 />
    </div>
  );
}

function Container247() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">29. AMOUNT PAID</p>
    </div>
  );
}

function Input196() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">$</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container246() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[69.5px] items-start left-[784px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container247 />
      <Input196 />
    </div>
  );
}

function Container249() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">30. RSVD FOR NUCC USE</p>
    </div>
  );
}

function Container248() {
  return (
    <div className="absolute content-stretch flex flex-col h-[69.5px] items-start left-[980px] pb-px pt-[7px] px-[7px] top-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container249 />
    </div>
  );
}

function Container234() {
  return (
    <div className="h-[69.5px] relative shrink-0 w-full" data-name="Container">
      <Container235 />
      <Container238 />
      <Container240 />
      <Container244 />
      <Container246 />
      <Container248 />
    </div>
  );
}

function Container252() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-[7px] top-[7px] w-[370px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[#0a0a0a] text-[9px] whitespace-nowrap">31. SIGNATURE OF PHYSICIAN OR SUPPLIER INCLUDING DEGREES OR CREDENTIALS</p>
    </div>
  );
}

function Container253() {
  return (
    <div className="absolute h-[10.656px] left-[7px] top-[23px] w-[370px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#0a0a0a] text-[8px] top-[-1px] whitespace-nowrap">(I certify that the statements on the reverse apply to this bill and are made a part thereof.)</p>
    </div>
  );
}

function Container255() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[4px] w-[370px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">SIGNED</p>
    </div>
  );
}

function Input197() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[16px] w-[370px]" data-name="input" />;
}

function Container256() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start left-0 top-[41px] w-[370px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">DATE</p>
    </div>
  );
}

function Input198() {
  return <div className="absolute border-[#d1d5dc] border-b border-solid h-[21px] left-0 top-[53px] w-[370px]" data-name="input" />;
}

function Container254() {
  return (
    <div className="absolute border-[#d1d5dc] border-solid border-t h-[75px] left-[7px] top-[41.66px] w-[370px]" data-name="Container">
      <Container255 />
      <Input197 />
      <Container256 />
      <Input198 />
    </div>
  );
}

function Container251() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <Container252 />
      <Container253 />
      <Container254 />
    </div>
  );
}

function Container258() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32. SERVICE FACILITY LOCATION INFORMATION</p>
    </div>
  );
}

function Input199() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input200() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input201() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City, State, ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container259() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32a. NPI</p>
    </div>
  );
}

function Input202() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container260() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">32b. Other ID</p>
    </div>
  );
}

function Input203() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container257() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container258 />
        <Input199 />
        <Input200 />
        <Input201 />
        <Container259 />
        <Input202 />
        <Container260 />
        <Input203 />
      </div>
    </div>
  );
}

function Container262() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">{`33. BILLING PROVIDER INFO & PH #`}</p>
    </div>
  );
}

function Input204() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input205() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Address line 1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input206() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">City, State, ZIP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input207() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[4px] py-[2px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Phone #</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container263() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">33a. NPI</p>
    </div>
  );
}

function Input208() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container264() {
  return (
    <div className="content-stretch flex h-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[9px]">33b. Other ID</p>
    </div>
  );
}

function Input209() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container261() {
  return (
    <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[7px] px-[7px] relative size-full">
        <Container262 />
        <Input204 />
        <Input205 />
        <Input206 />
        <Input207 />
        <Container263 />
        <Input208 />
        <Container264 />
        <Input209 />
      </div>
    </div>
  );
}

function Container250() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[210px] relative shrink-0 w-full" data-name="Container">
      <Container251 />
      <Container257 />
      <Container261 />
    </div>
  );
}

function P() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">Please Print or Type</p>
    </div>
  );
}

function P1() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">NUCC Instruction Manual available at: www.nucc.org</p>
    </div>
  );
}

function P2() {
  return (
    <div className="h-[10.656px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[10.667px] left-0 not-italic text-[#4a5565] text-[8px] top-[-1px] whitespace-nowrap">OMB APPROVAL PENDING</p>
    </div>
  );
}

function Container265() {
  return (
    <div className="bg-[#f9fafb] h-[57.969px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[9px] px-[9px] relative size-full">
        <P />
        <P1 />
        <P2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[1676.094px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container31 />
      <Container45 />
      <Container86 />
      <Container113 />
      <Container134 />
      <Container234 />
      <Container250 />
      <Container265 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[46px] relative rounded-[10px] shrink-0 w-[224.719px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[112px] not-italic text-[#364153] text-[16px] text-center top-[9px] whitespace-nowrap">Back to Session Selection</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[46px] min-h-px min-w-px relative rounded-[10px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[75px] not-italic text-[#364153] text-[16px] text-center top-[9px] whitespace-nowrap">Download PDF</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#3b82f6] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[145.047px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[73px] not-italic text-[16px] text-center text-white top-[8px] whitespace-nowrap">Submit Claim</p>
      </div>
    </div>
  );
}

function Container267() {
  return (
    <div className="h-[46px] relative shrink-0 w-[306.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container266() {
  return (
    <div className="content-stretch flex h-[71px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
      <Container267 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[1843.094px] relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] px-[32px] relative size-full">
        <Container8 />
        <Container266 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1959.094px] items-start left-[152px] top-[97px] w-[1232px]" data-name="Container">
      <Container4 />
      <Container7 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[2088.094px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container3 />
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